import { Entity, IdentifyProperty, Property } from 'orm-redis';

/**
 * Battlefield where the players evolve.
 */
@Entity()
export class Battlefield {

  /** Unique identifier. */
  @IdentifyProperty()
  id: number;

  /** Width of the battlefield. */
  @Property(Number)
  width: number;

  /** Height of the battlefield. */
  @Property(Number)
  height: number;

  /** Width of the canvas. */
  @Property(Number)
  canvasWidth: number;

  /** Height of the canvas. */
  @Property(Number)
  canvasHeight: number;

  /** 
   * Matrix representation of the game.
   * Example: "001002205060788001".
   * Each character represents a cell in a matrix.
   */
  @Property(String)
  matrixRepresentation: string;
}
