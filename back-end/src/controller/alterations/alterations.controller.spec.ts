import { Test, TestingModule } from '@nestjs/testing';
import { AlterationsController } from './alterations.controller';

describe('Alterations Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AlterationsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AlterationsController = module.get<AlterationsController>(AlterationsController);
    expect(controller).toBeDefined();
  });
});
