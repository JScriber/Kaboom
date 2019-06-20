import { Test, TestingModule } from '@nestjs/testing';
import { GameTokenService } from './game-token.service';

describe('GameTokenService', () => {
  let service: GameTokenService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameTokenService],
    }).compile();
    service = module.get<GameTokenService>(GameTokenService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
