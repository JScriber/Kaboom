import { Player } from './player.model';

/**
 * Dropped bomb on the battlefield.
 */
export interface Bomb {

  /** Unique identifier. */
  id: number;

  /** X position on the battlefield. */
  positionX: number;

  /** Y position on the battlefield. */
  positionY: number;

  /** Date at which the bomb has been placed. */
  putAt: String;

  /** Countdown before it explodes in miliseconds. */
  countdown: number;

  /** Range of the blast. */
  blast: number;

  /** Dropped bombs by the player. */
  owner: Player;
}
