import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../../shared/form/custom-validators';
import { FormValidationsService } from '../../../shared/form/services/form-validations.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  /** Password hidden or shown. */
  hide = true;

  /** Delete user form. */
  form: FormGroup = this.fb.group({

    /* Password. */
    password: ['', [
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
