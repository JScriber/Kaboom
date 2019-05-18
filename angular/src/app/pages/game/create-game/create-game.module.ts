import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './create-game/create-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CreateGameComponent
  ],
  exports: [
    CreateGameComponent
  ]
})
export class CreateGameModule {}
