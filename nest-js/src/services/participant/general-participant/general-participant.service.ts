import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Participant } from '@entity/participant/participant.entity';
import { User } from '@entity/user/user.entity';
import { Contest } from '@entity/contest/contest.entity';

// Typing interface.
import { IParticipantService } from '../participant.service.model';

/**
 * Implementation of the {@link IParticipantService} interface.
 */
@Injectable()
export class GeneralParticipantService implements IParticipantService {

  constructor(
    @InjectRepository(Participant) private readonly repository: Repository<Participant>) {}

  /** @inheritdoc */
  create(user: User, contest: Contest): Promise<Participant> {

    // TODO: Check if user isn't already participating.

    const participant = new Participant();

    participant.creator = contest.participants.length === 0;

    participant.user = user;
    participant.contest = contest;

    return this.repository.save(participant);
  }
}
