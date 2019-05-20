import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material';

// Components.
import { SuccessNotificationComponent } from './success-notification/success-notification.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';

// Services.
import { NotificationService } from './notification/notification.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatSnackBarModule
  ],
  declarations: [
    SuccessNotificationComponent,
    ErrorNotificationComponent
  ],
  providers: [
    NotificationService
  ],
  entryComponents: [
    SuccessNotificationComponent,
    ErrorNotificationComponent
  ]
})
export class NotificationModule {}
