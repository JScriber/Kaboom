import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Module({
  imports: [],
  providers: [
    ParticipantService
  ],
  exports: [
    ParticipantService
  ]
})
export class ParticipantModule {}
