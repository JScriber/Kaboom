import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token/token.service';
import { AuthService } from './auth/auth.service';
import { HttpStrategy } from './auth/http-strategy/http.strategy';
import { RepositoriesModule } from '../repositories/repositories.module';
import { EntitiesModule } from '../entities/entities.module';

import { GeneralContestService } from './contest/general-contest/general-contest.service';
import { GeneralMapService } from './map/general-map/general-map.service';
import { GeneralParticipantService } from './participant/general-participant/general-participant.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: 'OQTrltPlbj'
      })
    }),
    RepositoriesModule,
    EntitiesModule
  ],
  providers: [
    TokenService,
    AuthService,
    HttpStrategy,
    {
      provide: 'IMapService',
      useClass: GeneralMapService
    },
    {
      provide: 'IContestService',
      useClass: GeneralContestService
    },
    {
      provide: 'IParticipantService',
      useClass: GeneralParticipantService
    }
  ],
  exports: [
    TokenService
  ]
})
export class ServicesModule {}
