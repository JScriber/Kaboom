import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { PARTICIPANT_MODEL } from '../constants';

export interface Participant extends Document {
  readonly token: string;
  readonly position: {
    x: number;
    y: number;
  };
}

interface ParticipantDTO {
  readonly token: string;
  readonly position: {
    x: number;
    y: number;
  };
}

@Injectable()
export class ParticipantService {
  constructor(@InjectModel(PARTICIPANT_MODEL) private readonly participantModel: Model<Participant>) {}

  async create(dto: ParticipantDTO): Promise<Participant> {
    return await new this.participantModel(dto).save();
  }

  async findAll(): Promise<Participant[]> {
    return await this.participantModel.find().exec();
  }
}
