import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

import { environment } from '@environment';
import Player from '../model/player';
import Game from '../model/game';
import Participant from './participant.model';
import { Processes, WsBody, LogicHandler, GameConverter } from './gateway.model';

import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { GameService, Movement } from '../services/game/game.service';
import { MutexService } from '../services/mutex/mutex.service';
import { MutexNotifierService } from '../services/mutex-notifier/mutex-notifier.service';
import { RedisService } from '../services/redis/redis.service';
import { TokenService } from '../../services/token/token.service';

/** Route where the game state can be received. */
const GAME_STATE_ROUTE = 'state';

/** Process rate in milliseconds. */
const PROCESS_RATE: number = 100;

/**
 * Finds the current player in the game with the participant.
 * @param {Participant} param0
 * @param {Game} game
 * @returns {Player}
 */
const findPlayer = ({ playerID }: Participant, game: Game): Player => {
  return game.players.find(p => p.id === playerID);
};

@WebSocketGateway(environment.ports.ws, { path: '/game' })
export class GameWebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  /** Server reference. */
  @WebSocketServer() private readonly server;
  
  /** Map of processes. */
  private readonly processes: Processes = {};

  constructor(private readonly mutex: MutexService,
              private readonly registry: MutexNotifierService,
              private readonly redis: RedisService,
              private readonly logic: GameService,
              private readonly authentification: TokenService) {}

  /** Force authentification at connection time. */
  handleConnection(socket): void {
    console.log('CONNECTION');
    const participant = this.getParticipantFromSocket(socket);
    
    if (!participant) socket.client.disconnect();
  }
  
  /** Check disconnection of players. */
  handleDisconnect(socket): void {
    console.log('DISCONNECTED');
    const participant = this.getParticipantFromSocket(socket);

    if (participant) {
      this.applyStateChanges(participant, game => {
        // TODO: Set participant as disconnected.
        // TODO: Check if at least two participants. If not stop process.
        return game;
      }).subscribe(() => {});
    }
  }

  /**
   * Get the participant from the socket.
   * @param {any} socket
   * @returns {Participant | undefined}
   */
  private getParticipantFromSocket = ({ handshake }): Participant | undefined  => {
    const token: string | undefined = handshake.query.token;
    let participant: Participant;
  
    if (token) {
      try {
        participant = this.authentification.extractFrom(token);
      } catch (e) {}
    }
  
    return participant;
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  join(client, { participant: { gameID } }: WsBody): WsResponse<string> {
    const room = `${GAME_STATE_ROUTE}/${gameID}`;
    client.join(room);

    // TODO: Do it only if all member are present.
    // TODO: Add arg in game model: Is_started.
    this.startProcess(gameID);

    return {
      event: 'Access room',
      data: room
    };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('movement')
  movement(_, body: WsBody<Movement>): Observable<WsResponse<Game>> {
    return this.execute(this.logic.move, body).pipe(
      map(game => ({
        event: 'movement',
        data: game
      }))
    );
  }

  /**
   * Emits data in room.
   * @param {string} room 
   * @param {any} data
   */
  private emit(room: string, data: any): void {
    this.server.emit(room, data);
  }

  /**
   * Execute the given logic.
   * @template D
   * @param logic - Special function.
   * @param body - Parameters.
   * @returns {Observable<Game>}
   */
  private execute<D>(logic: LogicHandler<D>, { participant, data }: WsBody<D>): Observable<Game> {
    return this.applyStateChanges(participant, game => logic(
      findPlayer(participant, game),
      game, data)
    );
  }

  /**
   * Low-level game state applier.
   * @param {Participant} participant
   * @param {GameConverter} converter
   * @returns {Observable<Game>}
   */
  private applyStateChanges({ gameID }: Participant, converter: GameConverter): Observable<Game> {
    return this.access(gameID).pipe(
      map(converter),
      switchMap(game => this.redis.setGameState(game)),
      tap(({ id }) => this.mutex.unlock(id))
    );
  }

  /**
   * Access to the game state.
   * @param {number} gameID
   * @returns {Observable<Game>}
   */
  private access(gameID: number): Observable<Game> {
    return this.mutex.lock(gameID).pipe(
      switchMap(() => this.redis.getGameState(gameID))
    );
  }

  /**
   * Starts a new process.
   * @param {number} id
   */
  private startProcess(id: number): void {
    // Create a new lock notifier.
    this.registry.create(id);

    // Start the process.
    this.processes[id] = interval(PROCESS_RATE).pipe(
      switchMap(() => this.redis.getGameState(id))
    )
    .subscribe(game => this.emit(`${GAME_STATE_ROUTE}/${game.id}`, game));
  }

  /**
   * Stops a running process.
   * @param {number} id
   */
  private stopProcess(id: number): void {
    this.registry.drop(id);

    if (this.processes[id]) {
      this.processes[id].unsubscribe();
    }
  }
}
