import { Test, TestingModule } from '@nestjs/testing';
import { GeneralContestService } from './general-contest.service';

describe('GeneralContestService', () => {
  let service: GeneralContestService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralContestService],
    }).compile();
    service = module.get<GeneralContestService>(GeneralContestService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
