import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatMenuModule, MatButtonModule, MatDialogModule } from '@angular/material';

import { AccountComponent } from './account/account.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

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
    MatDialogModule
  ],
  declarations: [
    AccountComponent,
    PasswordDialogComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    PasswordDialogComponent,
    DeleteDialogComponent
  ]
})
export class AccountModule {}
