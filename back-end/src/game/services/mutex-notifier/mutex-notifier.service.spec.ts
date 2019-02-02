import { Test, TestingModule } from '@nestjs/testing';
import { MutexNotifierService } from './mutex-notifier.service';

describe('MutexNotifierService', () => {
  let service: MutexNotifierService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutexNotifierService],
    }).compile();
    service = module.get<MutexNotifierService>(MutexNotifierService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
