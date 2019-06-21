import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from '../redis.repository';
import { RunningContest } from '../../../entities/running-contest.entity';

/**
 * Repository to manipulate {@link RunningContest} entities.
 */
@Injectable()
export class RunningContestRepository extends BaseRedisRepository<RunningContest> {

  /** @inheritdoc */
  protected entityClass = RunningContest;

}
