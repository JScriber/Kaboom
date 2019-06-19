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
import { Participant } from '@entity/participant.entity';

// Models.
import { ContestForm, ContestIndex, ContestAccess } from '@model/contest';
import { ContestJoin } from '../../../models/contest/contest-join.model';

// Repository.
import { ContestRepository } from '../../../database/repository/contest.repository';

// Exceptions.
import { MapNotFoundException } from '../../../exceptions/map-not-found.exception';
import { ContestNotFoundException } from '../../../exceptions/contest-not-found.exception';
import { Bonus } from '../../../database/entity/alterations/bonus.entity';
import { Penalties } from '../../../database/entity/alterations/penalties.entity';
import { START_GAME_ROOM } from 'src/controller/contest-ws/contest.gateway';

/**
 * Implementation of the {@link IContestService} interface.
 */
@Injectable()
export class GeneralContestService implements IContestService {

  constructor(
    @InjectRepository(ContestRepository)
    private readonly repository: ContestRepository,

    @InjectRepository(Bonus)
    private readonly bonusRepository: Repository<Bonus>,
    @InjectRepository(Penalties)
    private readonly penaltiesRepository: Repository<Penalties>,

    @Inject('IParticipantService') private readonly participantService: IParticipantService,
    @Inject('IMapService') private readonly mapService: IMapService) {}

  /** @inheritdoc */
  async create(user: User, parameters: ContestForm): Promise<ContestJoin> {
    
    // TODO: Keep user to check if the map is owned by him.
    const map: Map = await this.mapService.findOne(parameters.map);

    if (map === undefined) {
      throw new MapNotFoundException(`The map with the ID ${parameters.map} doesn't exist.`);
    }

    const contest: Contest = new Contest();

    // Set the map.
    contest.map = map;

    // Set the time limit.
    contest.duration = parameters.duration;
    
    // Set the participants.
    contest.participants = [];
    contest.maxParticipants = parameters.players;

    // Set the bonus and penalties.
    contest.bonus = await this.bonusRepository.save(
      Object.assign(new Bonus(), parameters.bonus)
    );

    contest.penalties = await this.penaltiesRepository.save(
      Object.assign(new Penalties(), parameters.penalties)
    );

    // Persist.
    const { uuid } = await this.repository.save(contest);

    return new ContestJoin(uuid);
  }

  /** @inheritdoc */
  async join(uuid: string, user: User): Promise<ContestAccess> {

    // Find the contest.
    const contest = await this.getOne(uuid);

    // Check if the contest exists and is valid.
    if (!contest || (contest.participants.length >= contest.maxParticipants)) {
      throw new ContestNotFoundException('The contest doesn\'t exist or is not accessible.');
    }

    // Create the participant.
    const participant = await this.participantService.participate(user, contest);
    const token = this.participantService.getToken(participant);

    return new ContestAccess(token, START_GAME_ROOM, `waiting/${contest.uuid}`);
  }

  /** @inheritdoc */
  async leave(participant: Participant): Promise<void> {
    const { creator } = participant;
    const contest = participant.contest;

    // Deletes the participant.
    await this.participantService.delete(participant);

    // Check if the contest must be deleted.
    if (creator || contest.participants.length <= 1) {
      await this.delete(contest);
    }
  }

  /** @inheritdoc */
  getOne(uuid: string): Promise<Contest> {

    return this.repository.findByUUID(uuid);
  }

  /** @inheritdoc */
  async list(): Promise<ContestIndex[]> {

    const openedContests = await this.repository.findAvailable();

    return openedContests.map(c => new ContestIndex(c));
  }

  /** @inheritdoc */
  start(contest: Contest) {
    if (this.isReady(contest)) {
      // TODO: Build the contest in Redis.

      // Reset connections (recycle for game WS connection management).
      // contest.participants.forEach(p => this.participantService.disconnect(p));
    }
  }

  /** @inheritdoc */
  isReady(contest: Contest): boolean {
    return contest.maxParticipants === contest.participants.length
      && contest.participants.every(p => p.connected);
  }

  /** @inheritdoc */
  private async delete(contest: Contest): Promise<void> {

    const { bonus, penalties } = contest;

    await this.repository.delete(contest);

    /*
     * Delete the One-to-One relations as delete cascade isn't supported by TypeORM.
     * {@see https://github.com/typeorm/typeorm/issues/1913#issuecomment-380419861}
     */
    await this.bonusRepository.delete(bonus);
    await this.penaltiesRepository.delete(penalties);
  }
}
