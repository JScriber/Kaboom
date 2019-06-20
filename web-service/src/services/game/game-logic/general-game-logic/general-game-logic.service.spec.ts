import { Test, TestingModule } from '@nestjs/testing';
import { GeneralGameLogicService } from './general-game-logic.service';

describe('GeneralGameLogicService', () => {
  let service: GeneralGameLogicService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralGameLogicService],
    }).compile();
    service = module.get<GeneralGameLogicService>(GeneralGameLogicService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
