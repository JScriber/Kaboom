import { ValidatorFn, FormGroup, FormControl } from '@angular/forms';
import { Validations } from './regexp-store';

export class CustomValidators {

  /**
   * Password validation.
   */
  static password: ValidatorFn = (control: FormControl) => {

    return Validations.password.test(control.value) ? null : ({
      password: {
        valid: false,
        regexp: Validations.password
      }
    });
  }

  /** 
   * Same password validation.
   */
  static samePassword: ValidatorFn = (formGroup: FormGroup) => {
    const password = formGroup.controls.password.value;
    const confirmPassword = formGroup.controls.confirmPassword.value;

    return password === confirmPassword ? null : { notSamePassword: true }   
  }
}
