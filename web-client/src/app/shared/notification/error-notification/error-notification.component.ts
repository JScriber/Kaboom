import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationData } from '../notification/notification.service';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: NotificationData) { }

  /** Message to display. */
  get message() {
    return this.data.message;
  }
}
