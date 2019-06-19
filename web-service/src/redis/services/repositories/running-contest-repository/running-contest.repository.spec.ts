import { Test, TestingModule } from '@nestjs/testing';
import { RunningContestRepository } from './running-contest.repository';

describe('RunningContestRepository', () => {
  let service: RunningContestRepository;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunningContestRepository],
    }).compile();
    service = module.get<RunningContestRepository>(RunningContestRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
