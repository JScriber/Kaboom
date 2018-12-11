import { Module } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secretOrPrivateKey: 'OQTrltPlbj'
      })
    }),
  ],
  controllers: [],
  providers: [
    TokenService
  ],
  exports: [
    TokenService
  ]
})
export class ServicesModule {}
