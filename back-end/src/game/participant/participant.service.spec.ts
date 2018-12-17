import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantService } from './participant.service';

describe('ParticipantService', () => {
  let service: ParticipantService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantService],
    }).compile();
    service = module.get<ParticipantService>(ParticipantService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
