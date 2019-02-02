import { Module } from '@nestjs/common';
import { GameWebSocket } from './gateways/game.gateway';
import { Services } from './services/index';
import { ServicesModule } from '../services/services.module';
import { MutexNotifierService } from './services/mutex-notifier/mutex-notifier.service';
import { WsJwtGuard } from './guards/ws-jwt.guard';

@Module({
  imports: [
    ServicesModule
  ],
  providers: [
    ...Services,
    GameWebSocket,
    MutexNotifierService,
    WsJwtGuard,
  ]
})
export class GameModule {}
