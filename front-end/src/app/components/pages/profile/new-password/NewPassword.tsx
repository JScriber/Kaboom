import * as React from 'react';
import { Dialog, DialogTitle, LinearProgress, Snackbar } from '@material-ui/core';
import { generate } from 'generate-password';
import * as Yup from 'yup';
import { materialTranslated } from 'src/utils';

import { IProps, IState, styles } from './NewPassword.model';
import { Formik, FormikActions } from 'formik';
import NewPasswordForm from './form/NewPasswordForm';
import { Form } from './form/NewPasswordForm.model';
import { Validations } from 'src/app/services/validations/validations';
import { ApiService } from 'src/app/services/api/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


/**
 * Modals which allows the user to change his password.
 * Need to provide old password and new password.
 */
class NewPassword extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    loading: false,
    showSuccess: false
  };

  /** Api service. */
  private api: ApiService = ApiService.instance();

  /** Api call manager. */
  private apiManager: Subject<void> = new Subject();

  /** List of all wrong passwords. */
  private wrongPasswords: string[] = [];

  /**
   * Generates a random new password.
   * @returns {string}
   */
  private generateRandomPassword = () => generate({
    length: 10,
    numbers: true,
    symbols: true,
    uppercase: true,
    excludeSimilarCharacters: true
  });

  /** Handles success closing. */
  private handleCloseSuccess = () => this.setState({ showSuccess: false });

  /** 
   * Submits the form.
   * @param {Form} form
   */
  private submit = (form: Form, actions: FormikActions<Form>) => {

    this.setState({ loading: true });

    this.api.put('/player/@me/password', form)
      .pipe(takeUntil(this.apiManager))
      .subscribe(_ => {
        this.setState({
          loading: false,
          showSuccess: true
        });

        this.props.onClose();
      }, (error) => {
        if (error.message === 'Incorrect password.') {

          this.wrongPasswords.push(form.oldPassword);

          actions.setFieldError('oldPassword', 'PROFILE.PASSWORD_NEW.ERRORS.INCORRECT_PASSWORD');
        }

        this.setState({ loading: false });
      });
  };
  
  componentWillUnMount() {
    this.apiManager.next();
    this.wrongPasswords = [];
  }

  render() {
    const { open, t, onClose } = this.props;
    const { loading, showSuccess } = this.state;

    const validationSchema = Yup.object({
      oldPassword: Yup.string()
        .notOneOf(this.wrongPasswords, 'PROFILE.PASSWORD_NEW.ERRORS.INCORRECT_PASSWORD')
        .required('FORMS.PASSWORD_REQUIRED'),

      newPassword: Yup.string()
        .required('FORMS.PASSWORD_REQUIRED')
        .notOneOf([Yup.ref('oldPassword')], 'PROFILE.PASSWORD_NEW.ERRORS.SAME_AS_OLD')
        .matches(Validations.password, 'FORMS.PASSWORD_REGEX')
    });

    return (
      <React.Fragment>
        <Dialog open={open} onClose={onClose}>
          { loading && <LinearProgress/> }

          <DialogTitle>{t('PROFILE.PASSWORD_NEW.TITLE')}</DialogTitle>

          <Formik
            render={(props) => <NewPasswordForm {...props} generatePassword={this.generateRandomPassword} onClose={onClose}/>}
            initialValues={{
              oldPassword: '',
              newPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={this.submit}
          />
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={showSuccess}
          onClose={this.handleCloseSuccess}
          ContentProps={{
            'aria-describedby': 'success-message',
          }}
          message={<span id="success-message">{t('PROFILE.PASSWORD_NEW.SUCCESS')}</span>}
        />
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(NewPassword, styles);
