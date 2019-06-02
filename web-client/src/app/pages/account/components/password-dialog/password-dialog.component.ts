import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../../../shared/form/custom-validators';
import { UserApiService } from '../../services/api/user-api.service';
import { ChangePassword } from '../../models/change-password.model';

// Services.
import { FormValidationsService } from '../../../../shared/form/services/form-validations.service';
import { NotificationService } from 'src/app/shared/notification/notification/notification.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent {

  /** Reset password form. */
  form: FormGroup = this.fb.group({

    /* Old password. */
    oldPassword: ['', [
      Validators.required,
      CustomValidators.password
    ]],

    /* New password. */
    newPassword: ['', [
      Validators.required,
      CustomValidators.password
    ]],
  });

  /** Says if the component is loading. */
  loading = false;

  /** Says if the old password is hidden. */
  hideOldPassword = true;

  /** Says if the new password is hidden. */
  hideNewPassword = true;

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService,
              private readonly webService: UserApiService,
              private readonly notification: NotificationService) {}

  /**
   * Display error message of the control.
   * @param {string} path
   * @returns {string}
   */
  getErrorMessage(path: string) {
    return this.validation.getErrorMessage(this.form, path);
  }

  /** Submits the form. */
  submit() {
    if (this.form.valid) {
      const changePassword = new ChangePassword();

      changePassword.newPassword = this.form.value.newPassword;
      changePassword.oldPassword = this.form.value.oldPassword;

      this.loading = true;

      this.webService.changePassword(changePassword).subscribe(() => {
        // TODO: Dialog ref.
        console.log('Success');
        this.loading = false;
      }, () => {
        this.loading = false;
        // TODO: Dialog.
      });
    }
  }
}
