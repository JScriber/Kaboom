import { Test, TestingModule } from '@nestjs/testing';
import { GameBombBlastService } from './game-bomb-blast.service';

describe('GameBombBlastService', () => {
  let service: GameBombBlastService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBombBlastService],
    }).compile();
    service = module.get<GameBombBlastService>(GameBombBlastService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
