import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule,
  MatIconModule, MatInputModule, MatCardModule, MatButtonModule, MatDividerModule,
  MatRippleModule, MatDialogModule, MatListModule, MatCheckboxModule, MatProgressBarModule } from '@angular/material';

import { CreateGameComponent } from './create-game/create-game.component';
import { SelectListComponent } from './create-game/select-list/select-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { mockService } from 'src/utils';
import { CreateGameApiService } from './services/api/create-game-api.service';
import { MockCreateGameApiService } from './services/mock/mock-create-game-api.service';
import { WebServiceModule } from '../../../web-service/web-service.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,

    WebServiceModule
  ],
  declarations: [
    CreateGameComponent,
    SelectListComponent
  ],
  providers: [
    mockService(CreateGameApiService, MockCreateGameApiService)
  ],
  exports: [
    CreateGameComponent,
  ],
  entryComponents: [
    SelectListComponent
  ]
})
export class CreateGameModule {}
