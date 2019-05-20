import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGameModule } from './create-game/create-game.module';
import { JoinGameModule } from './join-game/join-game.module';
import { PhaserGameModule } from '../../game/game.module';

@NgModule({
  imports: [
    CommonModule,
    PhaserGameModule,

    CreateGameModule,
    JoinGameModule
  ],
  declarations: [],
})
export class GameModule {}
