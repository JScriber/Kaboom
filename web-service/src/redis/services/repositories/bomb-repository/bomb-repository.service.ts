import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from '../redis.repository';
import { Bomb } from '../../../entities/bomb.entity';

/**
 * Repository to manipulate {@link Bomb} entities.
 */
@Injectable()
export class BombRepository extends BaseRedisRepository<Bomb> {

  /** @inheritdoc */
  protected entityClass = Bomb;
}
