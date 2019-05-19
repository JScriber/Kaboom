import { Component, OnDestroy, OnInit } from '@angular/core';

import { MainScene } from '../services/scenes/main.scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [
    MainScene
  ]
})
export class GameComponent implements OnInit, OnDestroy {

  /** Game configuration. */
  readonly configuration: GameConfig | any = {
    type: Phaser.AUTO,
    parent: 'phaser-game-canvas',
    width: 208,
    height: 208,
    resolution: 1,
    pixelArt: true,
    zoom: 2,
    physics: {
      default: 'matter',
      matter: {
        gravity: { y: 0 },
        debug: false
      }
    },
  };

  /** Game instance. */
  private game: Phaser.Game;

  constructor(private readonly mainScene: MainScene) {}

  ngOnInit() {
    this.game = new Phaser.Game(this.configuration);

    this.game.scene.add(MainScene.KEY, this.mainScene, true);
  }

  ngOnDestroy() {    
    this.mainScene.sys.scenePlugin.remove(MainScene.KEY);
    this.game.destroy(true, false);

    console.clear();
  }
}
