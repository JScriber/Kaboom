import { Module } from '@nestjs/common';
import { GameWebSocket } from './gateways/game.gateway';
import { ServiceModule } from '../services/service.module';
import { WsJwtGuard } from './guards/ws-jwt.guard';

// Game related services.
import { GameService } from './services/game/game.service';
import { RedisService } from './services/redis/redis.service';

@Module({
  imports: [
    ServiceModule,
  ],
  providers: [
    GameService,
    RedisService,
    // GameWebSocket,
    WsJwtGuard
  ]
})
export class GameModule {}
