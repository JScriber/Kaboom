import * as React from 'react';
import { Dialog, DialogTitle, LinearProgress } from '@material-ui/core';
import * as Yup from 'yup';
import { materialTranslated } from 'src/utils';

import { IProps, IState, styles } from './DeleteAccount.model';
import { Formik, FormikActions } from 'formik';
import { Form } from './form/DeleteAccountForm.model';
import { Validations } from 'src/app/services/validations/validations';
import { ApiService } from 'src/app/services/api/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import DeleteAccountForm from './form/DeleteAccountForm';
import { pathRoutes } from 'src/root.routes';
import { push } from 'connected-react-router';
import { store } from 'src/app/redux';
import { logoutUser } from 'src/app/redux/user/actions/logout';

/**
 * Modals which allows the user to delete his own account.
 * Need to provide old password and new password.
 */
class DeleteAccount extends React.Component<IProps, IState> {

  /** State initialisation. */
  state: IState = {
    loading: false
  };

  /** Api service. */
  private api: ApiService = ApiService.instance();

  /** Api call manager. */
  private apiManager: Subject<void> = new Subject();

  /** 
   * Submits the form.
   * @param {Form} form
   */
  private submit = (form: Form, actions: FormikActions<Form>) => {

    this.setState({ loading: true });

    this.api.post('/player/@me/delete', form)
      .pipe(takeUntil(this.apiManager))
      .subscribe(_ => {
        this.setState({
          loading: false
        });

        this.props.onClose();

        store.dispatch(logoutUser());
        store.dispatch(push(pathRoutes.signUp));
      }, (_) => {
        actions.setFieldError('password', 'PROFILE.PASSWORD_NEW.ERRORS.INCORRECT_PASSWORD');
        this.setState({ loading: false });
      });
  };
  
  componentWillUnMount() {
    this.apiManager.next();
  }

  render() {
    const { open, t, onClose } = this.props;
    const { loading } = this.state;

    const validationSchema = Yup.object({
      password: Yup.string()
        .required('FORMS.PASSWORD_REQUIRED')
    });

    return (
      <React.Fragment>
        <Dialog open={open} onClose={onClose}>
          { loading && <LinearProgress/> }

          <DialogTitle>{t('PROFILE.DELETE_ACCOUNT.TITLE')}</DialogTitle>

          <Formik
            render={(props) => <DeleteAccountForm {...props} onClose={onClose}/>}
            initialValues={{
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={this.submit}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(DeleteAccount, styles);
