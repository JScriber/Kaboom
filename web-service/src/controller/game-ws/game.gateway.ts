import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { Gateway } from '../../utils/gateway';

@WebSocketGateway({ namespace: 'play' })
export class GameGateway extends Gateway  {

  /**
   * Authentification at connection time.
   */
  async handleConnection(socket: Socket) {
    console.log('Connect to game.');
  }

  @SubscribeMessage('push')
  onPush(client, data) {
    console.log('Puuush', data);
    return {
      event: 'pop',
      data,
    };
  }

  /**
   * Check disconnection of players.
   */
  async handleDisconnect(socket: Socket) {
    
  }
}
