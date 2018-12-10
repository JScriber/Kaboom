import { Module } from '@nestjs/common';
import { PlayerController } from './player/player.controller';
import { MapController } from './map/map.controller';
import { PoolController } from './pool/pool.controller';
import { EntitiesModule } from 'src/entities/entities.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    EntitiesModule,
    ServicesModule
  ],
  controllers: [
    PlayerController,
    MapController,
    PoolController
  ],
  providers: [],
})
export class ControllerModule {}
