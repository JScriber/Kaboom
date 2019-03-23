import * as React from 'react';
import { CardContent, CardHeader, LinearProgress, IconButton, Tooltip} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';

import { pathRoutes } from 'src/root.routes';
import { materialTranslated } from 'src/utils';

import { store } from 'src/app/redux';
import { push } from 'connected-react-router';

import { ApiService } from 'src/app/services/api/api';
import SignUpForm from './form/SignUpForm';
import { DEFAULT_LANGUAGE } from 'src/translation/translation';

// Model.
import { IProps, IState, Form, styles, NewUser } from './SignUp.model';

class SignUp extends React.Component<IProps, IState> {

  /** State initialization. */
  state: IState = {
    loading: false
  };

  /** Api. */
  private readonly api: ApiService = ApiService.instance();

  /** 
   * Submits the form.
   * @param {Form} form
   */
  private submit = (form: Form, actions: FormikActions<Form>) => {
    this.setState({ loading: true });

    const stopLoading = () => this.setState({ loading: false });

    const dto: Partial<Form> = JSON.parse(JSON.stringify(form));
    delete dto.confirmPassword;

    // Request the back-end.
    this.api.post<NewUser>('/player', dto)
      .subscribe(user => {
        this.api.setToken(user.token);
        store.dispatch(push(pathRoutes.home));
        stopLoading();
      }, e => {
        if (e.error === 'Bad Request') {
          if (e.message) {
            e.message.forEach((message: any) => {
              console.log(message.constraints);
            });
          }
        }

        const clearField = (field: string) => {
          actions.setFieldValue(field, '');
          actions.setFieldTouched(field, false);
        };

        // Clear password field.
        clearField('password');
        clearField('confirmPassword');

        console.log('Error', e);
        stopLoading();
      });
  }

  /** Redirects to the login page. */
  private loginPage = () => store.dispatch(push(pathRoutes.login));

  render() {
    const { classes, t } = this.props;
    const { loading } = this.state;

    const validationSchema = Yup.object({
      username: Yup.string()
        .required('SIGNUP.ERRORS.REQUIRED')
        .min(3, 'SIGNUP.ERRORS.USERNAME_LENGTH'),

      email: Yup.string()
        .required('SIGNUP.ERRORS.REQUIRED')
        .email('SIGNUP.ERRORS.EMAIL_REGEX'),

      password: Yup.string()
        .required('SIGNUP.ERRORS.REQUIRED')
        .matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, 'SIGNUP.ERRORS.PASSWORD_REGEX'),

      confirmPassword: Yup.string()
        .required('SIGNUP.ERRORS.REQUIRED')
        .oneOf([Yup.ref('password'), null], 'SIGNUP.ERRORS.PASSWORD_MATCH')
    });

    return (
      <Card className={classes.card}>
        { loading && <LinearProgress/> }
        <CardHeader
          action={
            <Tooltip title={this.props.t('SIGNUP.LOGIN_BUTTON')} aria-label="Login">
              <IconButton onClick={this.loginPage}>
                <ExitToAppIcon/>
              </IconButton>
            </Tooltip>
          }
          title={t('SIGNUP.TITLE')}/>

        <CardContent>
          <Formik
            render={(props) => <SignUpForm {...props} />}
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              language: DEFAULT_LANGUAGE
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
export default materialTranslated(SignUp, styles);
