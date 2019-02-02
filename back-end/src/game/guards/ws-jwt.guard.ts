import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsArgumentsHost } from '@nestjs/common/interfaces';

import { TokenService } from '../../services/token/token.service';
import { Participant } from '../gateways/participant.model';

@Injectable()
export class WsJwtGuard implements CanActivate {

  constructor(private readonly auth: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token: string = client.handshake.query.token;

    if (token) {
      try {
        const participant: Participant = this.auth.extractFrom(token);
        
        // Access participant after the guard.
        const wsContext: WsArgumentsHost = context.switchToWs();
        const data = Object.assign({}, wsContext.getData());

        // Remove old data.
        Object.keys(data).forEach(key => delete wsContext.getData()[key]);

        // Set old data.
        wsContext.getData().data = data;
        wsContext.getData().participant = {
          playerID: participant.playerID,
          gameID: participant.gameID
        };

        return true;
      } catch (e) {}
    }

    return false;
  }
}
