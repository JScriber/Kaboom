import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities.
import { Contest } from './entity/contest.entity';
import { Map } from './entity/map.entity';
import { Participant } from './entity/participant.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contest,
      Map,
      Participant,
      User
    ])
  ]
})
export class DatabaseModule {}
