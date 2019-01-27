import { Module } from '@nestjs/common';

import { GameWebSocket } from './gateways/game.gateway';
import { Services } from './services/index';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    ServicesModule
  ],
  providers: [
    ...Services,
    GameWebSocket
  ]
})
export class GameModule {}
