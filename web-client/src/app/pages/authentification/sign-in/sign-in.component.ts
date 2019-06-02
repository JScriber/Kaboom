import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { CustomValidators } from '../../../shared/form/custom-validators';

// Services.
import { FormValidationsService } from 'src/app/shared/form/services/form-validations.service';
import { UserSignApiService } from 'src/app/web-service/user-sign/api/user-sign-api.service';
import { AuthentificationService } from 'src/app/web-service/authentification/authentification.service';
import { TranslationService, Language } from '../../../shared/translation/translation.service';
import { NotificationService } from 'src/app/shared/notification/notification/notification.service';

// Models.
import { SignIn } from '../../../web-service/user-sign/models/sign-in.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  /** Sign-in form. */
  form: FormGroup = this.fb.group({

    /* Username. */
    username: ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]],

    /* Password. */
    password: ['', [
      Validators.required,
      CustomValidators.password
    ]],
  });

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService,
              private readonly translate: TranslationService,
              private readonly webService: UserSignApiService,
              private readonly authentification: AuthentificationService,
              private readonly notification: NotificationService) {}

  /**
   * Display error message of the control.
   * @param {string} path
   * @returns {string}
   */
  getErrorMessage(path: string) {
    return this.validation.getErrorMessage(this.form, path);
  }

  /** Called when the form is submitted. */
  submit() {
    this.form.markAsTouched();

    if (this.form.valid) {
      const { value } = this.form;
      const dto = new SignIn();

      dto.username = value.username;
      dto.password = value.password;

      this.webService.signIn(dto)
        .subscribe(payload => {
          this.notification.success('NOTIFICATION.SIGN_IN.SUCCESS');
          this.authentification.login(payload);
        }, err => {
          if (err.error.message === 'Incorrect credentials.') {
            this.notification.error('NOTIFICATION.SIGN_IN.INCORRECT_CREDENTIALS');
          }

          this.form.reset();
        });
    }
  }

  /**
   * Changes the interface language.
   * @param {Language} language
   */
  switchLanguage(language: Language) {
    this.translate.setLanguage(language);
  }
}
