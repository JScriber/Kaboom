import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantService } from './participant.service';
import { ParticipantSchema } from './participant.schema';
import { PARTICIPANT_MODEL } from '../constants';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: PARTICIPANT_MODEL,
      schema: ParticipantSchema
    }])
  ],
  providers: [
    ParticipantService
  ],
  exports: [
    ParticipantService
  ]
})
export class ParticipantModule {}
