import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from '../redis.repository';

// Entities.
import { Battlefield } from '../../../entities/battlefield.entity';
import { Player } from '../../../entities/player.entity';
import { Bomb } from 'src/redis/entities/bomb.entity';

/**
 * Repository to manipulate {@link Battlefield} entities.
 */
@Injectable()
export class BattlefieldRepository extends BaseRedisRepository<Battlefield> {

  /** @inheritdoc */
  protected entityClass = Battlefield;

}
