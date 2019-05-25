import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user/user.repository';
import { MapRepository } from "@repository/map/map.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      MapRepository
    ])
  ]
})
export class RepositoriesModule {}
