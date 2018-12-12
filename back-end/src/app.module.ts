import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { PlayerController } from './controller/player/player.controller';
import { MapController } from './controller/map/map.controller';
import { PoolController } from './controller/pool/pool.controller';
import { EntitiesModule } from './entities/entities.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token/token.service';
import { AuthService } from './services/auth/auth.service';
import { HttpStrategy } from './services/auth/http-strategy/http.strategy';

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
    EntitiesModule
  ],
  controllers: [
    PlayerController,
    MapController,
    PoolController
  ],
  providers: [
    TokenService,
    AuthService,
    HttpStrategy
  ],
})
export class AppModule {}
