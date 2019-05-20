import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinGameComponent } from './join-game/join-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    JoinGameComponent
  ],
  exports: [
    JoinGameComponent
  ]
})
export class JoinGameModule {}
