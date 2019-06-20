import Player, { PlayerContructor } from './player';

export class BotPlayer extends Player {

  constructor(scene: Phaser.Scene, parameters: PlayerContructor) {
    super(scene, parameters);
  }

  /** @inheritdoc */
  protected determineVelocity(): [number, number] {

    return [0, 0];
  }
}
