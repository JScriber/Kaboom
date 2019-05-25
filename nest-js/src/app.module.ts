import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controller/user/user.controller';
import { MapController } from './controller/map/map.controller';
import { EntitiesModule } from './entities/entities.module';
import { ContestController } from './controller/contest/contest.controller';
import { RepositoriesModule } from './repositories/repositories.module';
import { GameModule } from './game/game.module';
import { ServicesModule } from './services/services.module';
import { PoolWebSocket } from './websockets/pool/pool.websocket';
import { AlterationsController } from './controller/alterations/alterations.controller';

@Module({
  imports: [
    ServicesModule,
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user'
    }),
    TypeOrmModule.forRoot(),
    EntitiesModule,
    RepositoriesModule,
    GameModule
  ],
  controllers: [
    UserController,
    MapController,
    ContestController,
    AlterationsController
  ],
  providers: [
    PoolWebSocket
  ]
})
export class AppModule {}
