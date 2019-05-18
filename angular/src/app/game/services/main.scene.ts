import { Injectable } from '@angular/core';

@Injectable()
export class MainScene extends Phaser.Scene {

  /**
   * Instantiate scene service
   */
  constructor() {
    super({ key: 'Scene' });
  }

  /** On Init. */
  create(): void {
    this.cameras.main.startFollow(this.add.text(0, 0, 'Hello there! I am Phaser working with Angular 7').setOrigin(0.5), false);
  }
}
