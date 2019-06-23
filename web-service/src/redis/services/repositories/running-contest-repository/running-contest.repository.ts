import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from '../redis.repository';

// Entities.
import { RunningContest } from '../../../entities/running-contest.entity';
import { Bomb } from '../../../entities/bomb.entity';
import { Battlefield } from '../../../entities/battlefield.entity';
import { Player } from '../../../entities/player.entity';

/**
 * Repository to manipulate {@link RunningContest} entities.
 */
@Injectable()
export class RunningContestRepository extends BaseRedisRepository<RunningContest> {

  /** @inheritdoc */
  protected entityClass = RunningContest;

  /** Override. */
  async delete(entity: RunningContest) {

    // Delete bombs.
    Array.from(entity.battlefield.bombs).forEach(async ({ id }) => await this.manager.removeById(Bomb, id));

    // Delete battlefield.
    await this.manager.removeById(Battlefield, entity.battlefield.id);

    // Delete all players.
    Array.from(entity.players).forEach(async ({ id }) => await this.manager.removeById(Player, id));

    return super.delete(entity);
  }
}
