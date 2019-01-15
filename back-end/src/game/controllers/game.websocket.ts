import { WebSocketGateway, SubscribeMessage, WebSocketServer, WsResponse } from '@nestjs/websockets';

import { environment } from '@environment';
import { Vector } from '../model/physics/vector/vector';
import { GameService } from '../services/game/game.service';

interface MovementRequest {
  direction: Vector,
  speed: number;
}

@WebSocketGateway(environment.ports.ws, { path: '/game' })
export class GameWebsocket {
  /** Server reference. */
  @WebSocketServer() private readonly server;

  constructor(private readonly service: GameService) {}

  @SubscribeMessage('movement')
  movement(_: any, body: MovementRequest): WsResponse {
    this.service.move(body.direction, body.speed);

    return {
      event: 'movement',
      data: {
        message: 'Action is being treated...'
      }
    };
  }
}
