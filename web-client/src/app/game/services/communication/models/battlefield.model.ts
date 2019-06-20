/**
 * Battlefield where the players evolve.
 */
export interface Battlefield {

  /** Unique identifier. */
  id: number;

  /** Width of the battlefield. */
  width: number;

  /** Height of the battlefield. */
  height: number;

  /** 
   * Matrix representation of the game.
   * Example: "001002205060788001".
   * Each character represents a cell in a matrix.
   */
  matrixRepresentation: string;
}
