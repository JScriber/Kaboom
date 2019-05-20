import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { switchMap } from 'rxjs/operators';

// Validators.
import { CustomValidators } from '../../../shared/form/custom-validators';

// Services.
import { FormValidationsService } from '../../../shared/form/services/form-validations.service';
import { TranslationService } from '../../../shared/translation/translation.service';
import { UserSignApiService } from '../../../web-service/user-sign/api/user-sign-api.service';
import { AuthentificationService } from '../../../web-service/authentification/authentification.service';

// Models.
import { SignUp } from '../../../web-service/user-sign/models/sign-up.model';
import { SignIn } from '../../../web-service/user-sign/models/sign-in.model';

/**
 * Angular material ErrorStateMatcher.
 * Displays error on password confirmation when the parent is invalid.
 */
class PasswordErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const { parent } = control;

    const invalidCtrl = control && control.invalid;
    const invalidParent = !!(control && parent && parent.invalid && parent.dirty);

    return ((invalidCtrl || invalidParent) && control.touched) || (form.submitted && invalidCtrl);
  }
}

/**
 * SignUp view.
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  /** Password matching error steerer. */
  matcher = new PasswordErrorStateMatcher();

  /** Sign-up form. */
  form: FormGroup = this.fb.group({

    /* Username. */
    username: ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]],

    /* Email address. */
    emailAddress: ['', [ Validators.required, Validators.email ]],

    /* Password selection. */
    passwordGroup: this.fb.group({

      /* First selection. */
      password: ['', [
        Validators.required,
        CustomValidators.password
      ]],

      /* Password confirmation. */
      confirmPassword: ['', [ Validators.required ]]

    }, { validator: CustomValidators.samePassword }),

    /* User language. */
    language: ['', [ Validators.required ]]
  });

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService,
              private readonly translate: TranslationService,
              private readonly webService: UserSignApiService,
              private readonly authentification: AuthentificationService) {}

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
      const dto = new SignUp();

      dto.username = value.username;
      dto.email = value.emailAddress;
      dto.language = value.language;
      dto.password = value.passwordGroup.password;

      this.webService.signUp(dto).pipe(
        switchMap(() => {
          const signInDto = new SignIn();
          signInDto.username = dto.username;
          signInDto.password = dto.password;

          return this.webService.signIn(signInDto);
        })
      ).subscribe(payload => this.authentification.login(payload), err => {
        // TODO: Error handling.
        console.log(err);
      });
    }
  }

  ngOnInit() {
    this.form.get('language').valueChanges.subscribe(val => this.translate.setLanguage(val));
  }
}