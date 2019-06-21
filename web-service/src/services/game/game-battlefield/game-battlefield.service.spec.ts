import { Test, TestingModule } from '@nestjs/testing';
import { GameBattlefieldService } from './game-battlefield.service';

describe('GameBattlefieldService', () => {
  let service: GameBattlefieldService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBattlefieldService],
    }).compile();
    service = module.get<GameBattlefieldService>(GameBattlefieldService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
