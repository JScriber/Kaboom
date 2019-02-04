import { Module } from '@nestjs/common';
import { GameWebSocket } from './gateways/game.gateway';
import { ServicesModule } from '../services/services.module';
import { WsJwtGuard } from './guards/ws-jwt.guard';

// Game related services.
import { GameService } from './services/game/game.service';
import { RedisService } from './services/redis/redis.service';

@Module({
  imports: [
    ServicesModule,
  ],
  providers: [
    GameService,
    RedisService,
    GameWebSocket,
    WsJwtGuard,
  ]
})
export class GameModule {}
