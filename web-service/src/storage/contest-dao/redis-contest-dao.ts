import { Injectable } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';

import { RedisEntity } from '../base-dao/redis-base-dao.model';
import { RedisDAO } from '../base-dao/redis-base-dao';


class Contest implements RedisEntity {

  id?: number;

  @Expose()
  @Type(() => Number)
  maxParticipant: number;

  @Expose()
  @Type(() => Boolean)
  bonusActivated: boolean;

  @Expose()
  @Type(() => Boolean)
  penaltiesActivated: boolean;
}

@Injectable()
export class ContestDAO extends RedisDAO<Contest> {
  
  // TODO: Extract in annotation.
  protected tableName = 'contest';

  // TODO: Extract in annotation.
  protected classType = Contest;
}
