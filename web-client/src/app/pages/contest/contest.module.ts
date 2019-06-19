import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Angular material dependencies.
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

// Main pages.
import { CreateContestComponent } from './components/create-contest/create-contest.component';
import { ListContestComponent } from './components/list-contest/list-contest.component';
import { JoinContestComponent } from './components/join-contest/join-contest.component';

// Sub components.
import { SelectListComponent } from './components/create-contest/select-list/select-list.component';
import { ContestPreviewComponent } from './components/list-contest/contest-preview/contest-preview.component';

// Services.
import { ContestApiService } from './services/contest-api/api/contest-api.service';
import { MockContestApiService } from './services/contest-api/mock/mock-contest-api.service';
import { mockService } from 'src/utils';

import { WebServiceModule } from '../../web-service/web-service.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Real game module.
import { PhaserGameModule } from '../../game/game.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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

    PhaserGameModule,

    WebServiceModule,
    SharedModule
  ],
  declarations: [
    CreateContestComponent,
    ListContestComponent,
    JoinContestComponent,

    SelectListComponent,
    ContestPreviewComponent
  ],
  entryComponents: [
    SelectListComponent
  ],
  providers: [
    mockService(ContestApiService, MockContestApiService)
  ]
})
export class ContestModule {}
