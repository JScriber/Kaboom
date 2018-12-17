import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PlayerController } from './controller/player/player.controller';
import { MapController } from './controller/map/map.controller';
import { EntitiesModule } from './entities/entities.module';
import { TokenService } from './services/token/token.service';
import { AuthService } from './services/auth/auth.service';
import { HttpStrategy } from './services/auth/http-strategy/http.strategy';
import { PoolWebSocket } from './websockets/pool/pool.websocket';
import { ContestController } from './controller/contest/contest.controller';
import { RepositoriesModule } from './repositories/repositories.module';
import { ParticipantModule } from './game/participant/participant.module';


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
    MongooseModule.forRoot('mongodb://localhost:27017/database'),
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
    PoolWebSocket
  ],
})
export class AppModule {}
