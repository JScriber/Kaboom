import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Participant } from '@entity/participant.entity';
import { User } from '@entity/user.entity';
import { Contest } from '@entity/contest.entity';

import { TokenService } from '../../token/token.service';

// Repository.
import { ParticipantRepository } from '../../../database/repository/participant.repository';
import { ContestRepository } from '../../../database/repository/contest.repository';

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
    @InjectRepository(ParticipantRepository) private readonly repository: ParticipantRepository,
    @InjectRepository(ContestRepository) private readonly contestRepository: ContestRepository,

    private readonly tokenService: TokenService) {}

  /** @inheritdoc */
  async participate(user: User, contest: Contest): Promise<Participant> {

    let participant: Participant = contest.participants.find(p => p.user.id === user.id);

    if (!participant) {
      participant = new Participant();

      participant.connected = false;
      participant.creator = contest.participants.length === 0;
  
      participant.user = user;
      participant.contest = contest;

      participant = await this.repository.save(participant);
    }

    return this.repository.save(participant);
  }

  /** @inheritdoc */
  connect(participant: Participant) {
    participant.connected = true;

    this.repository.save(participant);
  }

  /** @inheritdoc */
  getToken({ uuid }: Participant): string {

    return this.tokenService.generateFrom<TokenPayload>({ uuid });
  }

  /** @inheritdoc */
  getFromToken(token: string): Promise<Participant> {

    const { uuid }: TokenPayload = this.tokenService.extractFrom(token);

    return this.repository.findByUUID(uuid);
  }

  /** @inheritdoc */
  async delete(participant: Participant): Promise<void> {
    await this.repository.delete(participant);
  }
}
