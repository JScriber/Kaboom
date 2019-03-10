import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PlayerController } from './controller/player/player.controller';
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
      property: 'player'
    }),
    TypeOrmModule.forRoot(),
    EntitiesModule,
    RepositoriesModule,
    GameModule
  ],
  controllers: [
    PlayerController,
    MapController,
    ContestController,
    AlterationsController
  ],
  providers: [
    PoolWebSocket
  ]
})
export class AppModule {}
