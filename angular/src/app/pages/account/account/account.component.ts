import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormValidationsService } from '../../../shared/form/services/form-validations.service';
import { TranslationService } from '../../../shared/translation/translation.service';
import { MatDialog } from '@angular/material';

// Components.
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  /** Account form. */
  form: FormGroup = this.fb.group({

    /* Username. */
    username: ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]],

    /* Email address. */
    emailAddress: ['', [ Validators.required, Validators.email ]],

    /* User language. */
    language: ['', [ Validators.required ]]
  });

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService,
              private readonly translate: TranslationService,
              private readonly dialog: MatDialog) {}

  /** Opens up the dialog to change the password. */
  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent, {
      width: '450px'
    });
  }

  /** Opens up the dialog to delete the user. */
  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, {
      width: '400px'
    });
  }

  /**
   * Display error message of the control.
   * @param {string} path
   * @returns {string}
   */
  getErrorMessage(path: string) {
    return this.validation.getErrorMessage(this.form, path);
  }

  ngOnInit() {
    this.form.get('language').valueChanges.subscribe(val => this.translate.setLanguage(val));

    // TODO: Feed form.
  }
}
