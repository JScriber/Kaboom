import { Test, TestingModule } from '@nestjs/testing';
import { RedisConnectionService } from './redis-connection.service';

describe('RedisConnectionService', () => {
  let service: RedisConnectionService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisConnectionService],
    }).compile();
    service = module.get<RedisConnectionService>(RedisConnectionService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
