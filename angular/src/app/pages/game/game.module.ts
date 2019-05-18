import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGameModule } from './create-game/create-game.module';
import { JoinGameModule } from './join-game/join-game.module';
import { PlayGameModule } from './play-game/play-game.module';

@NgModule({
  imports: [
    CommonModule,

    CreateGameModule,
    JoinGameModule,
    PlayGameModule
  ],
  declarations: [],
})
export class GameModule {}
