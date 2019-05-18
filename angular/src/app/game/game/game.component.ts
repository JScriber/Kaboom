import { Component } from '@angular/core';
import { MainScene } from '../services/main.scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  public readonly gameConfig: GameConfig = {
    title: 'Game Title',
    version: '1.0',
    type: Phaser.AUTO,
    width: 640,
    height: 480
  };

  constructor(public readonly mainScene: MainScene) {}

  onInit(game: Phaser.Game): void {
    game.scene.add('Scene', this.mainScene, true);
  }
}
