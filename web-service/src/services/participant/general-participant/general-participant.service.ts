import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Participant } from '@entity/participant.entity';
import { User } from '@entity/user.entity';
import { Contest } from '@entity/contest.entity';

import { TokenService } from '../../token/token.service';

// Typing interface.
import { IParticipantService } from '../participant.service.model';

/**
 * Payload of the token of a {@link Participant}.
 */
interface TokenPayload {
  uuid: string;
}

/**
 * Implementation of the {@link IParticipantService} interface.
 */
@Injectable()
export class GeneralParticipantService implements IParticipantService {

  constructor(
    @InjectRepository(Participant) private readonly repository: Repository<Participant>,
    private readonly tokenService: TokenService) {}

  /** @inheritdoc */
  create(user: User, contest: Contest): Promise<Participant> {

    // TODO: Check if user isn't already participating.

    const participant = new Participant();

    participant.connected = false;
    participant.creator = contest.participants.length === 0;

    participant.user = user;
    participant.contest = contest;

    return this.repository.save(participant);
  }

  /** @inheritdoc */
  connect(participant: Participant) {
    participant.connected = true;

    this.repository.save(participant);
  }

  /** @inheritdoc */
  disconnect(participant: Participant) {
    participant.connected = false;

    this.repository.save(participant);
  }

  /** @inheritdoc */
  getToken({ uuid }: Participant): string {

    return this.tokenService.generateFrom<TokenPayload>({ uuid });
  }

  /** @inheritdoc */
  getFromToken(token: string): Promise<Participant> {

    const { uuid }: TokenPayload = this.tokenService.extractFrom(token);

    return this.repository.findOne({ where: { uuid }});
  }
}
