import { WebSocketGateway, SubscribeMessage, WsResponse } from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { switchMap, map, mapTo, delay } from 'rxjs/operators';
import { Socket, Server } from 'socket.io';

import { environment } from '@environment';
import Player from '../model/player';
import Game from '../model/game';
import Participant from './participant.model';
import { WsBody, LogicHandler, GameConverter } from './gateway.model';

import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { GameService, Movement } from '../services/game/game.service';
import { RedisService } from '../services/redis/redis.service';
import { TokenService } from '../../services/token/token.service';
import { Gateway } from 'src/utils/gateway';
import { Broadcasts } from 'src/utils/gateway.model';

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

// @WebSocketGateway(environment.ports.ws, { namespace: '/game' })
export class GameWebSocket extends Gateway {

  /** Map of broadcasts. */
  private readonly broadcasts: Broadcasts = {};

  constructor(private readonly redis: RedisService,
              private readonly logic: GameService,
              private readonly authentification: TokenService) {
    super();
  }

  /** Force authentification at connection time. */
  handleConnection(socket: Socket): void {
    console.log('CONNECTED to game', socket.client.id);
    const participant = this.getParticipantFromSocket(socket);

    // console.log('TOKEN', this.authentification.generateFrom({
    //   playerID: 1,
    //   gameID: 1
    // }));

    if (!participant) socket.disconnect();
  }

  /** Check disconnection of players. */
  handleDisconnect(socket: Socket): void {
    console.log('DISCONNECTED', socket.client.id);
    const participant = this.getParticipantFromSocket(socket);


    if (participant) {
      // this.applyStateChanges(participant, game => {
      //   // TODO: Set participant as disconnected.
      //   // TODO: Check if at least two participants. If not stop process.
      //   return game;
      // }).subscribe(() => {}, () => {});
    }
  }

  /**
   * Get the participant from the socket.
   * @param {Socket} socket
   * @returns {Participant | undefined}
   */
  private getParticipantFromSocket = ({ handshake }: Socket): Participant | undefined  => {
    const token: string | undefined = handshake.query.token;
    let participant: Participant;
  
    if (token) {
      try {
        participant = this.authentification.extractFrom(token);
      } catch (e) {}
    }
  
    return participant;
  }

  @SubscribeMessage('test')
  async test(socket: Socket): Promise<WsResponse> {
    const player: Player = {
      id: 1,
      uuid: 'sqdfdsf',
      position: {
        x: 1,
        y: 1
      },
      items: []
    };

    const game: Game = {
      range: {
        start: new Date(),
        end: new Date()
      },
      players: [player],
      owner: player,
      map: {
        dimensions: {
          width: 50,
          height: 50
        },
        slots: []
      },
      bonus: {
        wallPass: true,
        teleportation: true,
        fireSuit: true,
        bombUp: true,
        speedUp: true,
        yellowFlame: true,
        redFlame: true,
        bombDisarmer: true,
        powerGlove: true,
        push: true,
        heart: false,
        lifeUp: false,
        swapPositions: true
      },
      penalty: {
        bombDown: false,
        speedDown: false,
        blueFlame: false,
        invert: false
      }
    };

    await this.redis.init(game);

    return {
      event: 'test',
      data: null
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join')
  join(socket: Socket, { participant: { gameID } }: WsBody): WsResponse<string> {
    const room = `${GAME_STATE_ROUTE}/${gameID}`;

    socket.join(room);

    // TODO: Do it only if all member are present.
    // TODO: Add arg in game model: Is_started.
    this.startBroadcast(gameID);

    return {
      event: 'Access room',
      data: room
    };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('movement')
  movement(_, body: WsBody<Movement>): Observable<WsResponse> {
    return this.execute(this.logic.move, body).pipe(
      mapTo({
        event: 'movement',
        data: null
      })
    );
  }

  /**
   * Execute the given logic.
   * @template D
   * @param logic - Special function.
   * @param body - Parameters.
   * @returns {Observable<void>}
   */
  private execute<D>(logic: LogicHandler<D>, { participant, data }: WsBody<D>): Observable<void> {
    return this.applyStateChanges(participant, (game) => logic(
      findPlayer(participant, game),
      game, data)
    );
  }

  /**
   * Low-level game state applier.
   * @param {Participant} participant
   * @param {GameConverter} converter
   * @returns {Observable<void>}
   */
  private applyStateChanges({ gameID }: Participant, converter: GameConverter): Observable<void> {
    // Fetch, alter and save state.
    return this.redis.accessMutable(gameID).pipe(
      delay(2000),
      map(converter),
      switchMap((game) => this.redis.save(game))
    );
  }

  /**
   * Starts broadcasting the game.
   * @param {number} id
   */
  private startBroadcast(id: number): void {
    const room = `${GAME_STATE_ROUTE}/${id}`;

    // On error, disconnect everyone.
    const criticalFailure = () => {
      this.disconnectAll(room);
      this.stopBroadcast(id);
    }

    // Start the process.
    this.broadcasts[id] = interval(PROCESS_RATE).pipe(
      switchMap(() => this.redis.access(id))
    )
    .subscribe(game => this.emit(room, game), criticalFailure);
  }

  /**
   * Stops broadcasting the game.
   * @param {number} id
   */
  private stopBroadcast(id: number): void {
    if (this.broadcasts[id]) {
      this.broadcasts[id].unsubscribe();
    }
  }
}
