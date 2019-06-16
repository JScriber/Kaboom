import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Typing interface.
import { IContestService } from '../contest.service.model';

// Services.
import { IMapService } from '@service/map/map.service.model';
import { IParticipantService } from '@service/participant/participant.service.model';

// Entities.
import { User } from '@entity/user.entity';
import { Contest } from '@entity/contest.entity';
import { Map } from '@entity/map.entity';

// Models.
import { ContestForm, ContestIndex } from '@model/contest';

/**
 * Implementation of the {@link IContestService} interface.
 */
@Injectable()
export class GeneralContestService implements IContestService {

  constructor(
    @InjectRepository(Contest) private readonly repository: Repository<Contest>,
    @Inject('IParticipantService') private readonly participantService: IParticipantService,
    @Inject('IMapService') private readonly mapService: IMapService) {}

  /** @inheritdoc */
  async create(user: User, parameters: ContestForm): Promise<string> {
    
    const map: Map = await this.mapService.findOne(parameters.map);

    if (map === undefined) throw new NotFoundException();

    const contest: Contest = new Contest();

    // Set the map.
    contest.map = map;
    
    // Set the participants.
    contest.participants = [];
    contest.maxParticipants = parameters.players;

    // Set the bonus and penalties.
    // TODO: Map all.

    contest.bonusActived = true;
    contest.penaltiesActivated = true;

    // Persist.
    const { uuid } = await this.repository.save(contest);

    return this.join(uuid, user);
  }

  /** @inheritdoc */
  async join(uuid: string, user: User): Promise<string> {

    // Find the contest.
    const contest = await this.repository.findOne({
      where: { uuid }
    });

    // Check if the contest is still accessible.
    if (contest.participants.length >= contest.maxParticipants) {
      // TODO: Throw custom exception.
    }

    // Create the participant.
    const participant = await this.participantService.create(user, contest);

    return this.participantService.getToken(participant);
  }

  /** @inheritdoc */
  async list(): Promise<ContestIndex[]> {

    const openedContests: Contest[] = await this.repository.find({
      where: { endDate: undefined }
    });

    return openedContests.map(c => new ContestIndex(c));
  }

  /** @inheritdoc */
  start(contest: Contest) {
    if (this.isReady(contest)) {
      // TODO: Build the contest in Redis.

      // Reset connections (recycle for game WS connection management).
      contest.participants.forEach(p => this.participantService.disconnect(p));
    }
  }

  /** @inheritdoc */
  isReady(contest: Contest): boolean {
    return contest.maxParticipants === contest.participants.length
      && contest.participants.every(p => p.connected);
  }
}
