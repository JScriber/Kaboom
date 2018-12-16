import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from './player-repository/player.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlayerRepository
    ]),
  ]
})
export class RepositoriesModule {}