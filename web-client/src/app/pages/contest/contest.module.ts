import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Angular material dependencies.
import { MatProgressBarModule, MatCardModule, MatButtonModule, MatDividerModule, MatRippleModule,
  MatSliderModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
  MatDialogModule, MatIconModule, MatListModule } from '@angular/material';

// Websocket.
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

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
import { WaitingRoomSocket } from './services/waiting-room/waiting-room.service';
import { mockService } from 'src/utils';

import { WebServiceModule } from '../../web-service/web-service.module';

// Real game module.
import { PhaserGameModule } from '../../game/game.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    // SocketIoModule,

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

    WebServiceModule
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
    mockService(ContestApiService, MockContestApiService),
    WaitingRoomSocket
  ]
})
export class ContestModule {}
