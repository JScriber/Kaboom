import { Test, TestingModule } from '@nestjs/testing';
import { MigrateContestService } from './migrate-contest.service';

describe('MigrateContestService', () => {
  let service: MigrateContestService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrateContestService],
    }).compile();
    service = module.get<MigrateContestService>(MigrateContestService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
