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

    this.socket = SocketIO('http://localhost:8081', { path: '/game' });

    const res = this.socket.emit('movement', {
      direction: {
        x: -1,
        y: 0
      },
      speed: 5
    });

    console.log(res);

    // this.socket.addEventListener('event', (data: any) => {
    //   console.log('I have been heard!', data.message);
    // });
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
