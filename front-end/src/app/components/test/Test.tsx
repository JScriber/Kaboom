import * as React from 'react';
import * as SocketIO from 'socket.io-client';

export default class TestComponent extends React.Component {

  private socket: SocketIOClient.Socket;

  constructor(props: any) {
    super(props);

    this.socket = SocketIO('http://localhost:8081', {
      path: '/game',
      query: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJJRCI6MSwiZ2FtZUlEIjoxLCJpYXQiOjE1NDkyODcwOTYsImV4cCI6MTU0OTQ1OTg5Nn0.Shjcj5UVBvytHeF1ppq3QXokAnv9Is_5tt4YknF40PY'
      }
    });

    this.socket.addEventListener('state/1', (game: any) => {
      console.log('Game', game);
    });
  }

  private buildGame = () => {
    this.socket.emit('test', {});
  }

  private move = () => {
    this.socket.emit('movement', {
      direction: {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      },
      speed: Math.floor(Math.random() * 100),
    });
  }

  private join = () => {
    this.socket.emit('join', {});
  }

  public render(): React.ReactNode {
    return (
      <div>
        <h1>Websocket test page</h1>

        <div>
          <button onClick={this.buildGame}>Build game</button>
          <button onClick={this.move}>Move</button>
          <button onClick={this.join}>Join</button>
        </div>
      </div>
    );
  }
}
