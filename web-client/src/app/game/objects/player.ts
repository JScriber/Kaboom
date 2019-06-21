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

/** Directional vector for movements. */
export interface Vector {

  /** Movement on the horizontal axis. */
  x: number;

  /** Movement on the vertical axis. */
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

  /** Speed of the character. */
  protected velocity = 2;

  /** Last direction (used for animation only). */
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

  /**
   * Determines the forces the exert on the player.
   * @returns {Vector}
   */
  protected abstract findDirection(): Vector;

  /** Hook called whenever the position changes. */
  protected movementHook(position: Position): void {}

  /** Determines the velocity to apply. */
  private determineVelocity(): [number, number] {

    // Forces applied to the player.
    const direction: Vector = this.findDirection();

    // The player must move if the direction indicates a value different of 0.
    const mustMove = direction.x !== 0 || direction.y !== 0;

    let velocityX = 0;
    let velocityY = 0;

    if (mustMove) {

      if (direction.y === 0) {
  
        // Goes right.
        if (direction.x < 0) {
          velocityX = this.velocity;
          velocityY = 0;
    
          this.animations.play(Walk.Right);
          this.lastDirection = Direction.Right;
        }
  
        // Goes left.
        if (direction.x > 0) {
          velocityX = -1 * this.velocity;
          velocityY = 0;
    
          this.animations.play(Walk.Left);
          this.lastDirection = Direction.Left;
        }
      } else {
  
        // Goes down.
        if (direction.y < 0) {
          velocityX = 0
          velocityY = this.velocity;
    
          this.animations.play(Walk.Down);
          this.lastDirection = Direction.Down;
        }
  
        // Goes up.
        if (direction.y > 0) {
          velocityX = 0
          velocityY = -1 * this.velocity;
    
          this.animations.play(Walk.Up);
          this.lastDirection = Direction.Up;
        }
      }

      this.movementHook(this.position);
    } else {
      // Determine the animation to play when not moving.
      switch(this.lastDirection) {

        case Direction.Up:
          this.animations.play(Idle.Up);
          break;

        case Direction.Down:
          this.animations.play(Idle.Down);
          break;

        case Direction.Left:
          this.animations.play(Idle.Left);
          break;

        case Direction.Right:
          this.animations.play(Idle.Right);
          break;
      }
    }

    return [velocityX, velocityY];
  }  
}
