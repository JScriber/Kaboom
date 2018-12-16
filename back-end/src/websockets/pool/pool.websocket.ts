import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsResponse } from '@nestjs/websockets';

@WebSocketGateway({ path: '/pool'})
export class PoolWebSocket {
  @WebSocketServer() server;

  @SubscribeMessage('event')
  chat(client: any, data: any): WsResponse {
    console.log('Get data!', data);
    this.server.emit('event', data);

    return { event: 'event', data };
  }
}