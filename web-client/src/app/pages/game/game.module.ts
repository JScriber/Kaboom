import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhaserGameModule } from '../../game/game.module';

// Regular pages.
import { CreateGameModule } from './create-game/create-game.module';
import { JoinGameModule } from './join-game/join-game.module';
import { WaitGameModule } from './wait-game/wait-game.module';

@NgModule({
  imports: [
    CommonModule,
    PhaserGameModule,

    CreateGameModule,
    JoinGameModule,
    WaitGameModule
  ],
  declarations: [],
})
export class GameModule {}
