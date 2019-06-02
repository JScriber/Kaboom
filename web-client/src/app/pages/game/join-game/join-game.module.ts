import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatRippleModule } from '@angular/material';

// Components.
import { JoinGameComponent } from './join-game/join-game.component';
import { GamePreviewComponent } from './join-game/game-preview/game-preview.component';

// Services.
import { JoinGameApiService } from './services/api/join-game-api.service';
import { MockJoinGameApiService } from './services/mock/mock-join-game-api.service';

import { mockService } from 'src/utils';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule
  ],
  declarations: [
    JoinGameComponent,
    GamePreviewComponent
  ],
  providers: [
    mockService(JoinGameApiService, MockJoinGameApiService)
  ],
  exports: [
    JoinGameComponent
  ]
})
export class JoinGameModule {}
