/**
 * Time related attributes of the game.
 */
export default interface TimeRange<T = Date> {
  /** Date at which the game started. */
  start: T;

  /** Date at which the game ends. */
  end: T;
}
