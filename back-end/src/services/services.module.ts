import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token/token.service';
import { AuthService } from './auth/auth.service';
import { HttpStrategy } from './auth/http-strategy/http.strategy';
import { RepositoriesModule } from '../repositories/repositories.module';
import { EntitiesModule } from '../entities/entities.module';


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
    HttpStrategy
  ],
  exports: [
    TokenService
  ]
})
export class ServicesModule {}
