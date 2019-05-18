import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayGameComponent } from './play-game/play-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlayGameComponent
  ],
  exports: [
    PlayGameComponent
  ]
})
export class PlayGameModule {}
