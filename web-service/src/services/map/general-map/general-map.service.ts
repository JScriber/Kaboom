import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Map } from '@entity/map.entity';

// Typing interface.
import { IMapService } from '../map.service.model';

/**
 * Implementation of the {@link IMapService} interface.
 */
@Injectable()
export class GeneralMapService implements IMapService {

  constructor(@InjectRepository(Map) private readonly repository: Repository<Map>) {}

  /** @inheritdoc */
  async findOne(id: number): Promise<Map | undefined> {

    return this.repository.findOne(id);
  }
}
