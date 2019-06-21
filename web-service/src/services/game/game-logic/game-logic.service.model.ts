// Models.
import { Vector } from './models/vector.model';

import { LogicHandler } from '../game-executor/game-executor.service';

/**
 * All the logic of the game.
 */
export interface IGameLogicService {

  /** Movement of a {@link Player}. */
  move: LogicHandler<Vector>;

}
