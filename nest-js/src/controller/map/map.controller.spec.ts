import { Test, TestingModule } from '@nestjs/testing';
import { MapController } from './map.controller';

describe('Map Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MapController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MapController = module.get<MapController>(MapController);
    expect(controller).toBeDefined();
  });
});
