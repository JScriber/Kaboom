import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from '../redis.repository';
import { Player } from '../../../entities/player.entity';

/**
 * Repository to manipulate {@link Player} entities.
 */
@Injectable()
export class PlayerRepository extends BaseRedisRepository<Player> {

  /** @inheritdoc */
  protected entityClass = Player;

}
