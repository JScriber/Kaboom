import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();
    service = module.get<GameService>(GameService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
