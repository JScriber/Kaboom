import MultiKey from '../utils/multikey';
import Player, { Direction, Position } from './player';

import { Walk, Idle } from './player-animations';

interface SteerablePlayerContructor {

  /** Unique identifier. */
  id: number;

  /** Initial player position. */
  initialPosition: Position;

  /** Function to call when a movement occurs. */
  movementOutput?: (position: Position) => void;
}

/** Player that can be controlled from the keyboard. */
export class SteerablePlayer extends Player {

  /** Keyboard inputs. */
  private inputs: {
    left: MultiKey,
    right: MultiKey,
    up: MultiKey,
    down: MultiKey
  };

  /** Notifier for movement. */
  private movementOutput: (position: Position) => void;

  constructor(scene: Phaser.Scene, parameters: SteerablePlayerContructor) {
    super(scene, { ... parameters });

    this.movementOutput = parameters.movementOutput;

    const { LEFT, UP, RIGHT, DOWN, Z, Q, S, D } = Phaser.Input.Keyboard.KeyCodes;

    this.inputs = {
      left: new MultiKey(scene, [LEFT, Q]),
      right: new MultiKey(scene, [RIGHT, D]),
      up: new MultiKey(scene, [UP, Z]),
      down: new MultiKey(scene, [DOWN, S])
    };
  }

  /** @inheritdoc */
  protected determineVelocity(): [number, number] {

    const isLeftKeyDown = this.inputs.left.isDown();
    const isRightKeyDown = this.inputs.right.isDown();
    const isUpKeyDown = this.inputs.up.isDown();
    const isDownKeyDown = this.inputs.down.isDown();

    const hasMove = isLeftKeyDown || isRightKeyDown || isUpKeyDown || isDownKeyDown;

    let velocityX = 0;
    let velocityY = 0;

    if (isRightKeyDown) {
      velocityX = this.velocity;
      velocityY = 0;

      this.animations.play(Walk.Right);
      this.lastDirection = Direction.Right;
    }

    if (isLeftKeyDown) {
      velocityX = -1 * this.velocity;
      velocityY = 0;

      this.animations.play(Walk.Left);
      this.lastDirection = Direction.Left;
    }

    if (isUpKeyDown) {
      velocityX = 0
      velocityY = -1 * this.velocity;

      this.animations.play(Walk.Up);
      this.lastDirection = Direction.Up;
    }

    if (isDownKeyDown) {
      velocityX = 0
      velocityY = this.velocity;

      this.animations.play(Walk.Down);
      this.lastDirection = Direction.Down;
    }

    if (hasMove) {
      this.movementOutput(this.position);
    } else {
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

    return [ velocityX, velocityY ];
  }
}
