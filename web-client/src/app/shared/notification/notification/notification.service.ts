import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components.
import { SuccessNotificationComponent } from '../success-notification/success-notification.component';
import { ErrorNotificationComponent } from '../error-notification/error-notification.component';

/** Duration of the notification. */
const NOTIFICATION_DURATION = 2000;

/** Data sent to the sub-components. */
export interface NotificationData {
  message: string;
}

@Injectable()
export class NotificationService {

  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Displays a success message.
   * @param {string} message
   */
  success(message: string) {
    this.open(message, SuccessNotificationComponent);
  }

  /**
   * Displays an error message.
   * @param {string} message
   */
  error(message: string) {
    this.open(message, ErrorNotificationComponent);
  }

  /**
   * Opens up a new snackbar.
   * @template T - Type of the component.
   * @param {string} message
   * @param {ComponentType<T>} component 
   */
  private open<T>(message: string, component: ComponentType<T>) {
    this.snackBar.openFromComponent(component, {
      duration: NOTIFICATION_DURATION,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      data: { message }
    });
  }
}
