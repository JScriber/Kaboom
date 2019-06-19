import { Test, TestingModule } from '@nestjs/testing';
import { TokenRunningContestService } from './token-running-contest.service';

describe('TokenRunningContestService', () => {
  let service: TokenRunningContestService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenRunningContestService],
    }).compile();
    service = module.get<TokenRunningContestService>(TokenRunningContestService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
