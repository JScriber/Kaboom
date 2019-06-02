import { Test, TestingModule } from '@nestjs/testing';
import { GeneralMapService } from './general-map.service';

describe('GeneralMapService', () => {
  let service: GeneralMapService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralMapService],
    }).compile();
    service = module.get<GeneralMapService>(GeneralMapService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
