import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';

describe('Player Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PlayerController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PlayerController = module.get<PlayerController>(PlayerController);
    expect(controller).toBeDefined();
  });
});
