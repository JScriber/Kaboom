import { Test, TestingModule } from '@nestjs/testing';
import { GeneralParticipantService } from './general-participant.service';

describe('GeneralParticipantService', () => {
  let service: GeneralParticipantService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralParticipantService],
    }).compile();
    service = module.get<GeneralParticipantService>(GeneralParticipantService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
