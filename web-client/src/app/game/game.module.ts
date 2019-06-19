import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GameComponent } from './game/game.component';
import { WebServiceModule } from '../web-service/web-service.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    WebServiceModule
  ],
  declarations: [
    GameComponent
  ],
  exports: [
    GameComponent
  ]
})
export class PhaserGameModule {}
