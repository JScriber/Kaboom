import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PlayerController } from './controller/player/player.controller';
import { MapController } from './controller/map/map.controller';
import { EntitiesModule } from './entities/entities.module';
import { HttpStrategy } from './services/auth/http-strategy/http.strategy';
import { PoolWebSocket } from './websockets/pool/pool.websocket';
import { ContestController } from './controller/contest/contest.controller';
import { RepositoriesModule } from './repositories/repositories.module';
import { ParticipantModule } from './game/participant/participant.module';
import { TokenService } from './services/token/token.service';
import { AuthService } from './services/auth/auth.service';
import { CachingService } from './services/caching/caching.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: 'OQTrltPlbj'
      })
    }),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'player'
    }),
    TypeOrmModule.forRoot(),
    RepositoriesModule,
    EntitiesModule,
    RepositoriesModule,
    ParticipantModule
  ],
  controllers: [
    PlayerController,
    MapController,
    ContestController
  ],
  providers: [
    TokenService,
    AuthService,
    HttpStrategy,
    CachingService,
    PoolWebSocket,
  ]
})
export class AppModule {}
