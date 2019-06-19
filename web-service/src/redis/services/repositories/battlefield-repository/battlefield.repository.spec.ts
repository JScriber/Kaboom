import { Test, TestingModule } from '@nestjs/testing';
import { BattlefieldRepository } from './battlefield.repository';

describe('BattlefieldRepository', () => {
  let service: BattlefieldRepository;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlefieldRepository],
    }).compile();
    service = module.get<BattlefieldRepository>(BattlefieldRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
