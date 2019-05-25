import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule, MatGridListModule } from '@angular/material';

import { CreateGameComponent } from './create-game/create-game.component';
import { SelectListComponent } from './select-list/select-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule
  ],
  declarations: [
    CreateGameComponent,
    SelectListComponent
  ],
  exports: [
    CreateGameComponent
  ]
})
export class CreateGameModule {}
