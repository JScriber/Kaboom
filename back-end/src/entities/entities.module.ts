import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';;
import { Contest } from './contest/contest.entity';
import { Map } from './map/map.entity';
import { Participant } from './participant/participant.entity';
import { Player } from './player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contest,
      Map,
      Participant,
      Player
    ]),
  ],
  controllers: [],
  providers: []
})
export class EntitiesModule {}
