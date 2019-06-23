import Player, { PlayerContructor, Position, Vector } from './player';

/**
 * Player remotely controlled by the server.
 */
export class RemotePlayer extends Player {

  /** Position of the bot on the server. */
  private serverPosition: Position; 

  constructor(scene: Phaser.Scene, parameters: PlayerContructor) {
    super(scene, parameters);

    this.serverPosition = parameters.initialPosition;
  }

  /**
   * Sets the given position as the server position.
   * @param {Position} position
   */
  setServerPosition(position: Position) {
    this.serverPosition = position;
  }

  /** Disconnects the player. */
  disconnect() {
    this.animations.play('disconnect');
  }

  /**
   * Finds the direction where the player goes.
   * @returns {Vector}
   */
  protected findDirection(): Vector {

    const vector: Vector = { x: 0, y: 0 };
    const position = this.position;

    // Check X movements.
    if (this.compare(position.x, this.serverPosition.x)) {
      vector.x = position.x > this.serverPosition.x ? 1 : -1;
    }

    // Check Y movements.
    if (this.compare(position.y, this.serverPosition.y)) {
      vector.y = position.y > this.serverPosition.y ? 1 : -1;
    }

    return vector;
  }

  /**
   * Compares the two values by adding a tolerance factor.
   * @param {number} val1
   * @param {number} val2
   * @returns {boolean}
   */
  private compare(val1: number, val2: number): boolean {
    // The tolerance is mandatory as the force exerted might be greater.
    const TOLERANCE: number = .75 * this.velocity;

    return Math.abs(Math.floor(val1) - Math.floor(val2)) > TOLERANCE;
  }
}
