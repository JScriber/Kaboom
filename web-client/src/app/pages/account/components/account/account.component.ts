import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

// Components.
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

// Services.
import { FormValidationsService } from '../../../../shared/form/services/form-validations.service';
import { TranslationService } from '../../../../shared/translation/translation.service';
import { UserApiService } from '../../services/api/user-api.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../../../shared/notification/notification/notification.service';

/** Time before the informations get sent (in miliseconds). */
const FORM_TIMEOUT = 800;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  /** Says if the form is loading. */
  loading = true;

  /** Account form. */
  form: FormGroup = this.fb.group({

    /* Username. */
    username: ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]],

    /* Email address. */
    email: ['', [ Validators.required, Validators.email ]],

    /* User language. */
    language: ['', [ Validators.required ]]
  });

  /** Form timeout. */
  private timeout: any;

  /** Last user state. */
  private lastState: User;

  constructor(private readonly fb: FormBuilder,
              private readonly validation: FormValidationsService,
              private readonly translate: TranslationService,
              private readonly dialog: MatDialog,
              private readonly webService: UserApiService,
              private readonly notification: NotificationService) {}

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

  /** Updates the timer. */
  updateTimeout() {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => this.submit(), FORM_TIMEOUT);
  }

  /** Submits the form. */
  submit() {
    if (this.form.valid) {
      const user = this.generateDto();
      this.loading = true;

      this.webService.save(user).subscribe(() => {
        this.loading = false;
        this.lastState = user;
      }, () => {
        this.refreshForm(this.lastState);
        this.loading = false;
        clearTimeout(this.timeout);

        this.notification.error('NOTIFICATION.ACCOUNT_ERROR');
      });
    }
  }

  ngOnInit() {
    this.form.get('language').valueChanges.subscribe(val => this.translate.setLanguage(val));

    this.webService.informations().subscribe(user => {
      this.loading = false;
      this.refreshForm(user);

      this.form.valueChanges.subscribe(() => this.updateTimeout());
    }, console.log);
  }

  /**
   * Refreshes the form.
   * @param {User} user
   */
  private refreshForm(user: User) {
    this.lastState = user;

    this.form.patchValue(user);
  }

  /**
   * Generates a User dto.
   * @returns {User}
   */
  private generateDto(): User {
    const { value } = this.form;
    const user = new User();

    user.username = value.username;
    user.email = value.email;
    user.language = value.language;

    return user;
  }
}
