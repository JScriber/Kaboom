import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from '../src/controller/player/player.controller';
import { TokenService } from '../src/services/token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerRepository } from '../src/repositories/player-repository/player.repository';
import { Player } from '../src/entities/player/player.entity';
import { IdentifiersInDto } from '../src/dto/player/identifiers/identifiers-in.dto';
import { environment } from '../environment';
import * as request from 'supertest';
import { PassportModule } from '@nestjs/passport';

describe('E2E - Player Controller', () => {
  let app: INestApplication;
  let module: TestingModule;

  // User used to do the tests.
  const playerTest: IdentifiersInDto = {
    username: 'tester',
    password: 'test'
  }

  beforeAll(async () => {
    
    module = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secretOrPrivateKey: environment.security.privateKey
          })
        }),
        PassportModule.register({
          defaultStrategy: 'bearer',
          property: 'player'
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

    app = module.createNestApplication();
    await app.init();
  });

  it('should create a user', async done => {
    const agent = request(app.getHttpServer());

    agent.post('/player').send(playerTest)
      .expect(200)
      .end(() => {
        agent.post('/player/login').send(playerTest)
        .expect(200)
        .end((token) => {
          return agent.get('/player/self/info')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((player: any) => {
              expect(player.username).toEqual(playerTest.username);
              done();
            });
        });
      });
  });

  afterAll(async () => {
    app.close();
  });
});
