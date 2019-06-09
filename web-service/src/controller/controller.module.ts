import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Controllers.
import { UserController } from './user/user.controller';
import { ContestController } from './contest/contest.controller';

// Websockets.
import { ContestGateway } from './contest-ws/contest.gateway';

// Services.
import { ServiceModule } from '../services/service.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user'
    }),
    ServiceModule,
    StorageModule
  ],
  controllers: [
    UserController,
    ContestController
  ],
  providers: [
    ContestGateway
  ]
})
export class ControllerModule {}
