import { Component, OnDestroy, OnInit } from '@angular/core';

import { MainScene } from '../services/scenes/main.scene';
import { Router } from '@angular/router';

import { StartContest } from '../../pages/contest/models/wait-contest/start-contest.model';

// Services.
import { GameRoomSocket } from '../services/communication/game-room.socket';
import { JsonConverterService } from '../../web-service/json-converter/json-converter.service';
import { mapParser } from '../services/parser/map-parser';

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
        debug: true
      }
    }
  };

  private connection: GameRoomSocket;

  /** Game instance. */
  private game: Phaser.Game;

  /** Says if the component has been destroyed. */
  private destroyed = false;

  constructor(private readonly router: Router,
              private readonly mainScene: MainScene) {

    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const { token } = navigation.extras.state as StartContest;

      this.connection = new GameRoomSocket(token);
    }
  }

  ngOnInit() {

    if (this.connection) {
      this.game = new Phaser.Game(this.configuration);

      // Share the connection.
      this.mainScene.setConnection(this.connection);

      this.game.scene.add(MainScene.KEY, this.mainScene, true);

      this.connection.disconnect$.subscribe(() => this.redirect());
    } else {
      this.redirect();
    }
  }

  ngOnDestroy() {
    this.destroyed = true;

    if (this.connection) {
      this.connection.disconnect();

      this.mainScene.sys.scenePlugin.remove(MainScene.KEY);
      this.game.destroy(true, false);

      console.clear();
    }
  }

  /** Redirects the user. */
  private redirect() {
    if (!this.destroyed) this.router.navigate(['/']);
  }
}
