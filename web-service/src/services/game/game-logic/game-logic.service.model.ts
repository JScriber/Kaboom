// Models.
import { Position } from './models/position.model';
import { Direction } from './models/direction.model';

import { LogicHandler } from '../game-executor/game-executor.service';

/**
 * All the logic of the game.
 */
export interface IGameLogicService {

  /** Movement of a {@link Player}. */
  move: LogicHandler<Position>;

  /** The {@link Player} puts a bomb. */
  bomb: LogicHandler<Direction>;
}
