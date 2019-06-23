import { Inject } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { tap } from 'rxjs/operators';

import { Gateway } from '../../utils/gateway';
import { RunningContest } from 'src/redis/entities/running-contest.entity';

// Services.
import { GameTokenService, DataAccess } from '@service/game/game-token/game-token.service';
import { GameExecutorService } from '@service/game/game-executor/game-executor.service';

import { IGameLogicService } from '@service/game/game-logic/game-logic.service.model';
import { Position } from '@service/game/game-logic/models/position.model';
import { Direction } from '@service/game/game-logic/models/direction.model';
import { Player } from '../../redis/entities/player.entity';

import { RunningContestRepository } from '../../redis/services/repositories/running-contest-repository/running-contest.repository';

@WebSocketGateway({ namespace: 'play' })
export class GameGateway extends Gateway  {

  constructor(private readonly tokenService: GameTokenService,
              private readonly executor: GameExecutorService,
              @Inject('IGameLogicService') private readonly logic: IGameLogicService,
              
              private readonly repository: RunningContestRepository) {
    super();
  }

  /**
   * Authentification at connection time.
   */
  async handleConnection(socket: Socket) {

    const data: DataAccess = await this.getDataFromSocket(socket);

    if (data) {
      socket.join(this.feedContestRoom(data[0]));
    } else {
      socket.disconnect();
    }
  }

  /**
   * Check disconnection of players.
   */
  async handleDisconnect(socket: Socket) {
    const data = await this.getDataFromSocket(socket);

    if (data) {
      let [contest, player ] = data;
      player.connected = false;

      if (Array.from(contest.players).some(p => p.connected)) {

        contest = await this.repository.save(contest);
  
        await this.shareState(contest);
      } else {
        // Delete all traces of the game.
        await this.repository.delete(contest);
      }
    }
  }

  /**
   * Asks for game propagation.
   */
  @SubscribeMessage('ready')
  async isReady(socket: Socket) {
    let [contest, player]: DataAccess = await this.getDataFromSocket(socket);

    if (!player.connected) {
      player.connected = true;

      contest = await this.repository.save(contest);

      await this.shareState(contest);
    }
  }

  /**
   * Movement on the battlefield.
   */
  @SubscribeMessage('move')
  move(socket: Socket, data: Position) {
    const token = this.getToken(socket);

    this.executor.execute(this.logic.move, data, token).pipe(
      tap(contest => this.shareState(contest))
    ).toPromise();
  }

  /**
   * Put a bomb on the battlefield.
   */
  @SubscribeMessage('bomb')
  bomb(socket: Socket, direction: Direction) {
    const token = this.getToken(socket);

    this.executor.execute(this.logic.bomb, direction, token).pipe(
      tap(contest => this.shareState(contest))
    ).toPromise();
  }

  /** 
   * Room where are sent the informations of the given contest.
   * @param {RunningContest} contest
   * @returns {string} - Room.
   */
  private feedContestRoom(contest: RunningContest) {
    return `feed/${contest.id}`;
  }

  /**
   * Shares the state of the given {@link RunningContest} to each member of the room.
   * @param {RunningContest} contest
   */
  private async shareState(contest: RunningContest) {
    const room = this.feedContestRoom(contest);

    const convertedContest = this.convert(contest);
    convertedContest.battlefield = this.convert(convertedContest.battlefield);

    // Socket of the connected persons in the room of the contest.
    const sockets = await this.socketsInRoom(room).toPromise();

    sockets.forEach(async (socket) => {

      // Extract only the information of the player from the socket.
      const player = await this.getPlayerFromSocket(socket);

      if (player !== undefined) {
        
        socket.emit(room, {
          player,
          contest: convertedContest
        });
      }
    });
  }

  /**
   * Gets the {@link Player} from the socket.
   * @param {Socket} socket
   * @returns {Promise<Player>}
   */
  private async getPlayerFromSocket(socket: Socket): Promise<Player | undefined> {
    const token = this.getToken(socket);
    let player: Player | undefined;

    if (token) {
      player = await this.tokenService.extractPlayerFromToken(token);
    }

    return player;
  }

  /**
   * Gets the {@link RunningContest} from the socket.
   * @param {Socket} socket
   */
  private async getDataFromSocket(socket: Socket): Promise<DataAccess> {
    const token = this.getToken(socket);
    let dataAccess: DataAccess;

    if (token) {
      dataAccess = await this.tokenService.extractFromToken(token);
    }

    return dataAccess;
  }

  /**
   * Converts the given entity to a suitable format for DTO.
   * @template T - Entity type.
   * @param entity
   */
  private convert<T>(entity: T): any {
    Object.keys(entity).forEach(k => {
      if (entity[k] instanceof Set) {
        entity[k] = Array.from(entity[k]);
      }
    });

    return entity;
  }

  /**
   * Gets the token of a socket.
   * @param {Socket} socket
   * @returns {string | undefined}
   */
  private getToken(socket: Socket): string | undefined {
    return socket.handshake.query.token;
  }
}
