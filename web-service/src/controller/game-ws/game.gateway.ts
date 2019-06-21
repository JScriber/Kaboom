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

@WebSocketGateway({ namespace: 'play' })
export class GameGateway extends Gateway  {

  constructor(private readonly tokenService: GameTokenService,
              private readonly executor: GameExecutorService,
              @Inject('IGameLogicService') private readonly logic: IGameLogicService) {
    super();
  }

  /**
   * Authentification at connection time.
   */
  async handleConnection(socket: Socket) {

    const data: DataAccess = await this.getContestFromSocket(socket);

    if (data) {
      socket.join(this.feedContestRoom(data[0]));
    } else {
      socket.disconnect();
    }
  }

  /**
   * Asks for game propagation.
   */
  @SubscribeMessage('ready')
  async isReady(socket: Socket) {
    const data: DataAccess = await this.getContestFromSocket(socket);

    await this.shareState(data[0]);
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

  private async shareState(contest: RunningContest) {
    const room = this.feedContestRoom(contest);

    this.socketsInRoom(room).subscribe(sockets => sockets.forEach(async (s) => {

      const [ contest, player ]: DataAccess = await this.getContestFromSocket(s);

      s.emit(room, {
        player,
        contest: this.convert(contest)
      });
    }))
  }

  private getToken(socket: Socket): string | undefined {
    return socket.handshake.query.token;
  }



  /**
   * Check disconnection of players.
   */
  async handleDisconnect(socket: Socket) {
    // TODO: Implement.
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
   * Gets the {@link RunningContest} from the socket.
   * @param {Socket} socket
   */
  private async getContestFromSocket(socket: Socket): Promise<DataAccess> {
    const { token } = socket.handshake.query;
    let dataAccess: DataAccess;

    if (token) {
      try {
        dataAccess = await this.tokenService.extractFromToken(token);
      } catch (e) {}
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
}
