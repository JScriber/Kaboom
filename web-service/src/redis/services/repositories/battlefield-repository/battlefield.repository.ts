import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from '../redis.repository';

import { Battlefield } from '../../../entities/battlefield.entity';

/**
 * Repository to manipulate {@link Battlefield} entities.
 */
@Injectable()
export class BattlefieldRepository extends BaseRedisRepository<Battlefield> {

  /** @inheritdoc */
  protected entityClass = Battlefield;

}
