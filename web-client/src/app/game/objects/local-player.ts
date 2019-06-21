import MultiKey from '../utils/multikey';
import Player, { Position } from './player';

import { Vector } from './player';

interface LocalPlayerContructor {

  /** Unique identifier. */
  id: number;

  /** Initial player position. */
  initialPosition: Position;

  /** Function to call when a movement occurs. */
  movementOutput?: (position: Position) => void;
}

/** Player that can be controlled from the keyboard. */
export class LocalPlayer extends Player {

  /** Keyboard inputs. */
  private inputs: {
    left: MultiKey,
    right: MultiKey,
    up: MultiKey,
    down: MultiKey
  };

  /** Notifier for movement. */
  private movementOutput: (position: Position) => void;

  constructor(scene: Phaser.Scene, parameters: LocalPlayerContructor) {
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
  protected movementHook(position: Position) {
    this.movementOutput(position);
  }

  /** @inheritdoc */
  protected findDirection(): Vector {

    const vector: Vector = { x: 0, y: 0 };

    const LEFT = this.inputs.left.isDown();
    const RIGHT = this.inputs.right.isDown();
    const UP = this.inputs.up.isDown();
    const DOWN = this.inputs.down.isDown();

    if (LEFT || RIGHT) {
      vector.x = LEFT ? 1 : -1;
    } else {
      if (UP || DOWN) {
        vector.y = UP ? 1 : -1;
      }
    }

    return vector;
  }
}
