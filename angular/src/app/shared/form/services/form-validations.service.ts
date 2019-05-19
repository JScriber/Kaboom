import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
export class FormValidationsService {

  private readonly ERROR_MESSAGES = {
    required: 'REQUIRED',
    email: 'EMAIL',
    password: 'PASSWORD',
    notSamePassword: 'PASSWORD_CONFIRM'
  };

  /**
   * Get the error message of the targeted control.
   * @param {FormGroup} form
   * @param {string} path
   * @returns {string}
   */
  getErrorMessage(form: FormGroup, path: string): string {
    const control = this.select(form, path);
    let message = '';

    if (control && control.errors && control.touched) {
      const keys = Object.keys(control.errors);
  
      if (keys.length === 1) {
        message = this.getTranslationKey(this.ERROR_MESSAGES[keys[0]]);
      }
    }

    return message;
  }

  /**
   * Selects nested abstract controls.
   * @param {FormGroup} group - Base form.
   * @param {string} path - Path to the control.
   * @returns {AbstractControl}
   */
  private select(group: FormGroup, path: string): AbstractControl {
    return path.split('.').reduce((control, entry) => control.get(entry), group);
  }

  /**
   * Builds the translation key.
   * @param {string} suffix
   * @returns {string}
   */
  private getTranslationKey(suffix: string): string {
    return `FORM.ERRORS.${suffix}`;
  }
}
