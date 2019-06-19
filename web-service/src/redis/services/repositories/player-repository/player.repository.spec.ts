import { Test, TestingModule } from '@nestjs/testing';
import { PlayerRepository } from './player.repository';

describe('PlayerRepository', () => {
  let service: PlayerRepository;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerRepository],
    }).compile();
    service = module.get<PlayerRepository>(PlayerRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
