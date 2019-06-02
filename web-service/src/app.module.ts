import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [
    ControllerModule,
    GameModule
  ]
})
export class AppModule {}
