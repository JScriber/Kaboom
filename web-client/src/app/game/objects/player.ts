import MultiKey from '../utils/multikey';
import PlayerAnimations, { Walk, Idle } from './player-animations';

export enum Direction {
  Left,
  Right,
  Up,
  Down
}

/** Position of the player. */
export interface Position {

  /** Horizontal position. */
  x: number;

  /** Vertical position. */
  y: number;
}

/**
 * Constructor parameters for the {@link Player} object.
 */
export interface PlayerContructor {

  /** Unique identifier. */
  id: number;

  /** Initial player position. */
  initialPosition: Position;
}

export default abstract class Player {

  /** Player ID. */
  id: number;

  protected scene: Phaser.Scene;

  protected sprite: Phaser.Physics.Matter.Sprite;

  protected velocity = 2;

  protected lastDirection = Direction.Down;

  /** Animations handler. */
  protected animations: PlayerAnimations;

  constructor(scene: Phaser.Scene, parameters: PlayerContructor) {

    this.id = parameters.id;

    this.scene = scene;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, 'player1', 7);

    const Bodies = (Phaser.Physics.Matter as any).Matter.Bodies;

    const mainBody = Bodies.rectangle(0, 5, 12, 8, { chamfer: { radius: 5 } });

    const { x, y } = parameters.initialPosition;

    this.sprite.setExistingBody(mainBody);
    this.sprite.setFixedRotation();
    this.sprite.setPosition(x, y);

    this.sprite.setDisplayOrigin(8, 16);

    // Initialize animation handler.
    this.animations = new PlayerAnimations(this.sprite, scene, 'player1');
  }

  /**
   * Returns the position of the player.
   * @returns {Position}
   */
  get position(): Position {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  update() {
    const [ velocityX, velocityY ] = this.determineVelocity();

    this.sprite.setVelocity(velocityX, velocityY);
  }

  /** Determines the velocity to apply. */
  protected abstract determineVelocity(): [number, number];  
}
