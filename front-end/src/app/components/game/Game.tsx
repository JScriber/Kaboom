import * as Phaser from 'phaser-ce';
import * as React from 'react';
import * as SocketIO from 'socket.io-client';

export default class Game extends React.Component {

  protected readonly config = {
    height: 600,
    width: 800
  };
  // physics: {
  //   arcade: {
  //     debug: false,
  //     gravity: {y: 300},
  //   },
  //   default: 'arcade',
  // },
  // type: Phaser.AUTO,
  // scene: {
  //   preload: preload,
  //   create: create,
  //   update: update
  // }

  protected game: Phaser.Game;

  private socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
      create: this.create,
      preload: this.preload,
      update: this.update
    });

    this.socket = SocketIO('http://localhost:8081', {
      path: '/game',
      query: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MSwiZ2FtZUlEIjoxLCJpYXQiOjE1NDkxMTIwNDcsImV4cCI6MTU0OTI4NDg0N30.HiP3qM2ebYw8pL528eIMM1Iwz__D-kxs0BYsIhGdF80'
      }
    });

    this.socket.emit('join', {});

    this.socket.emit('movement', {
      direction: {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      },
      speed: Math.floor(Math.random() * 100),
    });

    this.socket.addEventListener('state/1', (game: any) => {
      console.log('Game', game);
    });
  }

  public preload() {
    // TODO: Extract the root.
    this.game.load.image('sky', 'assets/images/sky.png');
    this.game.load.image('ground', 'assets/images/platform.png');
    this.game.load.image('star', 'assets/images/star.png');
    this.game.load.image('bomb', 'assets/images/bomb.png');
    this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
  }

  public create() {
    this.game.add.image(400, 300, 'sky');
  }

  public update() {
    // TODO
  }

  public render(): React.ReactNode {
    return (
      <div/>
    );
  }
}
