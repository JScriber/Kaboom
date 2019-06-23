import { Test, TestingModule } from '@nestjs/testing';
import { BombRepositoryService } from './bomb-repository.service';

describe('BombRepositoryService', () => {
  let service: BombRepositoryService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BombRepositoryService],
    }).compile();
    service = module.get<BombRepositoryService>(BombRepositoryService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
