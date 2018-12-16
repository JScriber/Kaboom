import { Test, TestingModule } from '@nestjs/testing';
import { ContestController } from './contest.controller';

describe('Contest Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ContestController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ContestController = module.get<ContestController>(ContestController);
    expect(controller).toBeDefined();
  });
});
