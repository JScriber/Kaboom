import { Inject } from '@nestjs/common';
import { WebSocketGateway, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { Gateway } from '../../utils/gateway';

import { environment } from '@environment';

// TODO: Pay intention to namespace.
@WebSocketGateway(environment.ports.ws, { namespace: 'game' })
export class GameGateway extends Gateway  {

  constructor() {
    super();
  }

  /**
   * Authentification at connection time.
   */
  async handleConnection(socket: Socket) {
    console.log('Connect to game.');
  }

  /**
   * Check disconnection of players.
   */
  async handleDisconnect(socket: Socket) {
    
  }
}
