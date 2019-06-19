import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Controllers.
import { UserController } from './user/user.controller';
import { ContestController } from './contest/contest.controller';

// Websockets.
import { ContestGateway } from './contest-ws/contest.gateway';
import { GameGateway } from './game-ws/game.gateway';

// Services.
import { ServiceModule } from '../services/service.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user'
    }),
    ServiceModule
  ],
  controllers: [
    UserController,
    ContestController
  ],
  providers: [
    ContestGateway,
    GameGateway
  ]
})
export class ControllerModule {}
