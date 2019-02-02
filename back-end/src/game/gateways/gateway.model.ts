import { Subscription } from 'rxjs';

import Player from '../model/player';
import Game from '../model/game';
import Participant from './participant.model';

/** Methods which contains some logic. */
export type LogicHandler<D> = (p: Player, g: Game, d: D) => Game;

/** Function which takes a game and return a new state for this game. */
export type GameConverter = (game: Game) => Game;

/** Body of websockets. */
export interface WsBody<T = any> {
  participant: Participant,
  data: T
}

/** Map of running processes. */
export interface Processes {
  [key: number]: Subscription;
}
