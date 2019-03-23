import * as React from 'react';
import { Card, CardContent, CardHeader, LinearProgress, Tooltip, IconButton } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';
import { push } from 'connected-react-router';
import { materialTranslated } from 'src/utils';

// Application related.
import LoginForm from './form/LoginForm';
import { ApiService } from 'src/app/services/api/api';

// Model.
import { IState, IProps, styles, LoginUser } from './Login.model';
import { Form } from './form/LoginForm.model';

/** Login component using the Login model. */
class Login extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    loading: false
  };

  /** Api. */
  private readonly api: ApiService = ApiService.instance();

  /** Redirects to sign in view. */
  private signUpPage = () => store.dispatch(push(pathRoutes.signUp));

  /** 
   * Submits the form.
   * @param {Form} form
   */
  private submit = (form: Form, actions: FormikActions<Form>) => {
    this.setState({ loading: true });

    const stopLoading = () => this.setState({ loading: false }); 

    this.api.post<LoginUser>('/player/login', form).subscribe(({ token }) => {
      this.api.setToken(token);
      store.dispatch(push(pathRoutes.home));
      stopLoading();
    }, (err) => {
      if (err.statusCode === 400 && err.message === 'Incorrect credentials.') {
        console.log('bad password');
      }

      // Clear password field.
      actions.setFieldValue('password', '');
      actions.setFieldTouched('password', false);

      stopLoading();
    });
  };

  render() {
    const { classes, t } = this.props;
    const { loading } = this.state;

    const validationSchema = Yup.object({
      username: Yup.string()
        .required('LOGIN.ERRORS.USERNAME_REQUIRED')
        .min(3, 'LOGIN.ERRORS.USERNAME_LENGTH'),

      password: Yup.string()
        .required('LOGIN.ERRORS.PASSWORD_REQUIRED')
        .matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, 'LOGIN.ERRORS.PASSWORD_REGEX')
    });

    return (
      <Card className={classes.card}>
        { loading && <LinearProgress/> }
        <CardHeader
          action={
            <Tooltip title={this.props.t('LOGIN.SIGNUP_BUTTON')} aria-label="Login">
              <IconButton onClick={this.signUpPage}>
                <PersonAddIcon/>
              </IconButton>
            </Tooltip>
          }
          title={t('LOGIN.TITLE')}/>

        <CardContent>
          <Formik
            render={(props) => <LoginForm {...props} />}
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={this.submit}
          />
        </CardContent>
      </Card>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(Login, styles);
