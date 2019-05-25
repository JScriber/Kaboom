import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule, MatGridListModule, MatIconModule, MatInputModule } from '@angular/material';

import { CreateGameComponent } from './create-game/create-game.component';
import { SelectListComponent } from './select-list/select-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,

    MatExpansionModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
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
