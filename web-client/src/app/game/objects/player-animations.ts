export enum Walk {
  Left = 'WALK_LEFT',
  Up = 'WALK_UP',
  Right = 'WALK_RIGHT',
  Down = 'WALK_DOWN'
}

export enum Idle {
  Left = 'IDLE_LEFT',
  Up = 'IDLE_UP',
  Right = 'IDLE_RIGHT',
  Down = 'IDLE_DOWN'
};

type Animation = Walk | Idle | 'disconnect';

export default class PlayerAnimations {

  constructor(private readonly sprite: Phaser.Physics.Matter.Sprite,
              private readonly scene: Phaser.Scene,
              private readonly spriteKey: string) {

    // Left animations.
    this.add(Walk.Left, [4, 5]);
    this.add(Idle.Left, [3]);

    // Up animations.
    this.add(Walk.Up, [0, 2]);
    this.add(Idle.Up, [1]);

    // Right animations.
    this.add(Walk.Right, [10, 11]);
    this.add(Idle.Right, [9]);

    // Down animations.
    this.add(Walk.Down, [6, 8]);
    this.add(Idle.Down, [7]);

    // Disconnect animation.
    this.add('disconnect', [12, 13, 14, 15, 16, 17]);
  }

  /**
   * Plays the given animation
   * @param animation 
   */
  play(animation: Animation) {
    this.sprite.anims.play(this.buildKey(animation), true);
  }

  /**
   * Creates a new animation.
   * @param animation 
   * @param frames 
   */
  private add(animation: Animation, frames: number[]) {
    this.scene.anims.create({
      key: this.buildKey(animation),
      frameRate: 5,
      frames: this.scene.anims.generateFrameNumbers(this.spriteKey, { frames }),
    });
  }

  /**
   * Builds a unique key for each animation for each sprite.
   * @param animation
   * @returns {string}
   */
  private buildKey(animation: Animation): string {
    return `${this.spriteKey}:${animation}`;
  }
}
