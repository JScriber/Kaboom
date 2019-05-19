import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormValidationsService } from '../../../shared/form/services/form-validations.service';
import { CustomValidators } from '../../../shared/form/custom-validators';

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

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService) {}

  /**
   * Display error message of the control.
   * @param {string} path
   * @returns {string}
   */
  getErrorMessage(path: string) {
    return this.validation.getErrorMessage(this.form, path);
  }
}
