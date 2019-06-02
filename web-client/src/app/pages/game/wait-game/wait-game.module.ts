import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';

import { WaitGameComponent } from './wait-game/wait-game.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    ClipboardModule
  ],
  declarations: [
    WaitGameComponent
  ],
  exports: [
    WaitGameComponent
  ]
})
export class WaitGameModule {}
