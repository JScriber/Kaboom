import Listing from '../listing';

/**
 * Different bonus activated in the game.
 */
export default interface Bonus extends Listing<boolean> {
  /** Can pass through walls. */
  wallPass: boolean;

  /** Can teleport somewhere. */
  teleportation: boolean;

  /** The player no longer fears fire. */
  fireSuit: boolean;

  /** Increases the number of bombs dropped simultaneously. */
  bombUp: boolean;

  /** Increases the speed of the player. */
  speedUp: boolean;

  /** Increases the explosion area. */
  yellowFlame: boolean;

  /** The explosion has no limit. */
  redFlame: boolean;

  /** Can disarm bombs. */
  bombDisarmer: boolean;

  /** Can push bombs. */
  powerGlove: boolean;

  /** Can push other players. */
  push: boolean;

  /** Add one heart to the player. */
  heart: boolean;

  /** Add one life to the player. */
  lifeUp: boolean;

  /** Swap positions with another player. */
  swapPositions: boolean;
}
