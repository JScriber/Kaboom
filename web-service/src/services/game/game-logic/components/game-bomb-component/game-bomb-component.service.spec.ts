import { Test, TestingModule } from '@nestjs/testing';
import { GameBombComponent } from './game-bomb-component.service';

describe('GameBombComponent', () => {
  let service: GameBombComponent;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameBombComponent],
    }).compile();
    service = module.get<GameBombComponent>(GameBombComponent);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
