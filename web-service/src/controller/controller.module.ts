import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Controllers.
import { UserController } from './user/user.controller';
import { ContestController } from './contest/contest.controller';

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
  ]
})
export class ControllerModule {}
