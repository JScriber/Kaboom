import { Player } from './player.model';
import { Battlefield } from './battlefield.model';

/**
 * Contest running. Aggregates all the data related to the game.
 */
export interface RunningContest {

  /** Unique identifier. */
  id: number;

  /** Players of the contest. */
  players: Player[];

  /** Battlefield. */
  battlefield: Battlefield;
}
