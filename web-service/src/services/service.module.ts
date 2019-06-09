import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { environment } from '@environment';

import { TokenService } from './token/token.service';
import { AuthService } from './auth/auth.service';
import { HttpStrategy } from './auth/http-strategy/http.strategy';

import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';

import { GeneralUserService } from './user/general-user/general-user.service';
import { GeneralMapService } from './map/general-map/general-map.service';
import { GeneralContestService } from './contest/general-contest/general-contest.service';
import { GeneralParticipantService } from './participant/general-participant/general-participant.service';

/** Business logic services. */
const PROVIDERS: Provider[] = [
  {
    provide: 'IUserService',
    useClass: GeneralUserService
  },
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
];

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: environment.security.jwtSecretKey
      })
    }),
    TypeOrmModule.forRoot(),
    DatabaseModule,
    StorageModule
  ],
  providers: [
    TokenService,
    AuthService,
    HttpStrategy,
    ... PROVIDERS
  ],
  exports: [
    TokenService,
    ... PROVIDERS
  ]
})
export class ServiceModule {}
