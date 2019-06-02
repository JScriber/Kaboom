import MultiKey from '../utils/multikey';
import PlayerAnimations, { Walk, Idle } from './player-animations';

enum Direction {
  Left,
  Right,
  Up,
  Down
}

export default class Player {

  private scene: Phaser.Scene;

  private sprite: Phaser.Physics.Matter.Sprite;

  private velocity = 2;

  private inputs: {
    left: MultiKey,
    right: MultiKey,
    up: MultiKey,
    down: MultiKey
  };

  private lastDirection = Direction.Down;

  /** Animations handler. */
  private animations: PlayerAnimations;

  constructor(scene: Phaser.Scene, x: number, y: number) {

    this.scene = scene;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, 'player1', 7);

    const Bodies = (Phaser.Physics.Matter as any).Matter.Bodies;

    const mainBody = Bodies.rectangle(0, 5, 12, 8, { chamfer: { radius: 5 } });

    this.sprite.setExistingBody(mainBody);
    this.sprite.setFixedRotation();
    this.sprite.setPosition(x, y);

    this.sprite.setDisplayOrigin(8, 16);

    const { LEFT, UP, RIGHT, DOWN, Z, Q, S, D } = Phaser.Input.Keyboard.KeyCodes;

    this.inputs = {
      left: new MultiKey(scene, [LEFT, Q]),
      right: new MultiKey(scene, [RIGHT, D]),
      up: new MultiKey(scene, [UP, Z]),
      down: new MultiKey(scene, [DOWN, S])
    };

    // Initialize animation handler.
    this.animations = new PlayerAnimations(this.sprite, scene, 'player1');
  }

  update() {
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

    if (!hasMove) {
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

    this.sprite.setVelocity(velocityX, velocityY);
  }
}
