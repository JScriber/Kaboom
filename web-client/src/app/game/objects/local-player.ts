import MultiKey from '../utils/multikey';
import Player, { Position } from './player';

import { Vector } from './player';
import { Skin } from '../services/communication/models/player.model';

// Services.
import { GameRoomSocket } from '../services/communication/game-room.socket';

interface LocalPlayerContructor {

  /** Unique identifier. */
  id: number;

  /** Initial player position. */
  initialPosition: Position;

  /** Skin of the player. */
  skin: Skin;

  /** Connection to the server. */
  connection: GameRoomSocket;
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

  /** Connection to the server. */
  private connection: GameRoomSocket;

  constructor(scene: Phaser.Scene, parameters: LocalPlayerContructor) {
    super(scene, { ... parameters });

    this.connection = parameters.connection;

    const { LEFT, UP, RIGHT, DOWN, Z, Q, S, D } = Phaser.Input.Keyboard.KeyCodes;

    this.inputs = {
      left: new MultiKey(scene, [LEFT, Q]),
      right: new MultiKey(scene, [RIGHT, D]),
      up: new MultiKey(scene, [UP, Z]),
      down: new MultiKey(scene, [DOWN, S])
    };

		// Attach bomb event to key A.
		this.scene.input.keyboard.addKey('A').on('up', () => this.putBomb());
  }

  /** @inheritdoc */
  protected movementHook(position: Position) {
    this.connection.move(position);
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

  /** The players puts a bomb. */
  private putBomb() {
    this.connection.bomb(this.lastDirection);
  }
}
