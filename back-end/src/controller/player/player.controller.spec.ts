import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { TokenService } from '../../services/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerRepository } from '../../repositories/player-repository/player.repository';
import { Player } from '../../entities/player/player.entity';
import { environment } from '../../../environment';

describe('UT - Player Controller', () => {
  let module: TestingModule;
  let controller: PlayerController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secretOrPrivateKey: environment.security.privateKey
          })
        }),
      ],
      controllers: [
        PlayerController
      ],
      providers: [
        TokenService,
        {
          provide: getRepositoryToken(Player),
          useValue: PlayerRepository,
        }
      ]
    }).compile();
  });
  
  beforeAll(async () => {
    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
