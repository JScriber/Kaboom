import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaserModule } from 'phaser-component-library';

import { GameComponent } from './game/game.component';
import { MainScene } from './services/main.scene';

@NgModule({
  imports: [
    CommonModule,
    PhaserModule
  ],
  declarations: [
    GameComponent
  ],
  exports: [
    GameComponent
  ],
  providers: [
    MainScene
  ]
})
export class PhaserGameModule {}
