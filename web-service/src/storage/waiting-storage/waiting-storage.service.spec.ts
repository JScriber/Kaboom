import { Test, TestingModule } from '@nestjs/testing';
import { WaitingStorageService } from './waiting-storage.service';

describe('WaitingStorageService', () => {
  let service: WaitingStorageService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingStorageService],
    }).compile();
    service = module.get<WaitingStorageService>(WaitingStorageService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
