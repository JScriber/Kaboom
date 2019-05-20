import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatMenuModule, MatButtonModule, MatDialogModule, MatProgressBarModule } from '@angular/material';

import { mockService } from 'src/utils';

// Components.
import { AccountComponent } from './components/account/account.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

// Modules.
import { SharedModule } from 'src/app/shared/shared.module';

// Services.
import { UserApiService } from './services/api/user-api.service';
import { MockUserApiService } from './services/mock/mock-user-api.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,

    SharedModule
  ],
  declarations: [
    AccountComponent,
    PasswordDialogComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    PasswordDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    mockService(UserApiService, MockUserApiService)
  ]
})
export class AccountModule {}
