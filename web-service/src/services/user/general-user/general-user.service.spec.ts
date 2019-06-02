import { Test, TestingModule } from '@nestjs/testing';
import { GeneralUserService } from './general-user.service';

describe('GeneralUserService', () => {
  let service: GeneralUserService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralUserService],
    }).compile();
    service = module.get<GeneralUserService>(GeneralUserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
