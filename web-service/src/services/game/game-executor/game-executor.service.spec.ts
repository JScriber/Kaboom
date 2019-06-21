import { Test, TestingModule } from '@nestjs/testing';
import { GameExecutorService } from './game-executor.service';

describe('GameExecutorService', () => {
  let service: GameExecutorService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameExecutorService],
    }).compile();
    service = module.get<GameExecutorService>(GameExecutorService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
