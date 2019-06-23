import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import * as decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { RunningContest } from './models/running-contest.model';
import { Player } from './models/player.model';
import { Position, Direction } from '../../objects/player';

/** Payload of the running contest token. */
export interface RunningContestToken {
  runningContestId: number;
  playerId: number;
}

export interface GameState {
  player: Player;
  contest: RunningContest;
}

/**
 * Executable action in the game room.
 */
export class GameRoomSocket extends Socket {

  /** Says when the socket is disconnected. */
  disconnect$ = this.fromEvent<void>('disconnect');

  /** Game state informations. */
  feed$: Observable<GameState>;

  /** The client says he's ready. */
  ready = () => this.emit('ready');

  /** Makes the player move. */
  move = (position: Position) => this.emit('move', position);

  /** The player puts a bomb. */
  bomb = (direction: Direction) => this.emit('bomb', direction);

  constructor(token: string) {
    super({
      url: environment.apiUrl,
      options: {
        query: { token }
      }
    });

    this.ioSocket.nsp = '/play';

    this.initFeed(token);
  }

  /**
   * Initializes the game feed.
   * @param {string} token
   */
  private initFeed(token: string) {
    const contest: number = decode<RunningContestToken>(token).runningContestId;

    this.feed$ = this.fromEvent(`feed/${contest}`);
  }
}
