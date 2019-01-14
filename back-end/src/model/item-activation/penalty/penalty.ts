import Listing from '../listing';

/**
 * Different penalties activated in the game.
 */
export default interface Penalty extends Listing<boolean> {
  /** Lowers the number of bombs. */
  bombDown: boolean;

  /** Decreases the speed of the player. */
  speedDown: boolean;

  /** Decreases the explosion area. */
  blueFlame: boolean;

  /** Inverts the controls. */
  invert: boolean;
}
