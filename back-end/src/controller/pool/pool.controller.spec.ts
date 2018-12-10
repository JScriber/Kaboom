import { Test, TestingModule } from '@nestjs/testing';
import { PoolController } from './pool.controller';

describe('Pool Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PoolController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PoolController = module.get<PoolController>(PoolController);
    expect(controller).toBeDefined();
  });
});
