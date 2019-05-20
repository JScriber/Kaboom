import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../../../shared/form/custom-validators';
import { FormValidationsService } from '../../../../shared/form/services/form-validations.service';
import { UserApiService } from '../../services/api/user-api.service';
import { AuthentificationService } from '../../../../web-service/authentification/authentification.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  /** Password hidden or shown. */
  hide = true;

  /** Says if the component is loading. */
  loading = false;

  /** Delete user form. */
  form: FormGroup = this.fb.group({

    /* Password. */
    password: ['', [
      Validators.required,
      CustomValidators.password
    ]],
  });

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService,
              private readonly webService: UserApiService,
              private readonly auth: AuthentificationService) {}

  /**
   * Display error message of the control.
   * @param {string} path
   * @returns {string}
   */
  getErrorMessage(path: string) {
    return this.validation.getErrorMessage(this.form, path);
  }

  submit() {
    this.webService.delete(this.form.value.password).subscribe(() => {
      // TODO: Close modal.
      this.auth.redirectLogin();
    }, console.log);
  }
}
