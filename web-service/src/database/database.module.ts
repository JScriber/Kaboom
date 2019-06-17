import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities.
import { Contest } from './entity/contest.entity';
import { Map } from './entity/map.entity';
import { Participant } from './entity/participant.entity';
import { User } from './entity/user.entity';

import { Penalties } from './entity/alterations/penalties.entity';
import { Bonus } from './entity/alterations/bonus.entity';

// Repositories.
import { ContestRepository } from './repository/contest.repository';
import { ParticipantRepository } from '@repository/participant.repository';

/** List of all the entities. */
const ENTITIES = [
  Contest,
  Map,
  Participant,
  User,
  Bonus,
  Penalties
];

/** List of all the repositories. */
const REPOSITORIES = [
  ContestRepository,
  ParticipantRepository
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ... ENTITIES,
      ... REPOSITORIES
    ])
  ]
})
export class DatabaseModule {}
