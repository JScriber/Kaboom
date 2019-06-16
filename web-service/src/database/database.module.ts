import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities.
import { Contest } from './entity/contest.entity';
import { Map } from './entity/map.entity';
import { Participant } from './entity/participant.entity';
import { User } from './entity/user.entity';

// Repositories.
import { ContestRepository } from './repository/contest.repository';

/** List of all the entities. */
const ENTITIES = [
  Contest,
  Map,
  Participant,
  User
];

/** List of all the repositories. */
const REPOSITORIES = [
  ContestRepository
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
