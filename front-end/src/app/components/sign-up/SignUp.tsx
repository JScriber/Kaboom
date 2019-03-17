import * as React from 'react';
import { CardContent, CardHeader, TextField, LinearProgress, Divider, Button, IconButton, Tooltip} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { pathRoutes } from 'src/root.routes';
import { DEFAULT_LANGUAGE } from 'src/translation/translation';
import { materialTranslated } from 'src/utils';

import { store } from 'src/app/redux';
import { push } from 'connected-react-router';

import { FormComponent } from '../form/Form';
import LanguageSelector from '../shared/language-selector/LanguageSelector';
// import { Validator } from '../form/Validators';

// Model.
import { IProps, IState, Form, styles, NewUser } from './SignUp.model';

class SignUp extends FormComponent<IProps, IState> {

  /** @inheritdoc */
  protected formBuilder(): Form {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      language: DEFAULT_LANGUAGE
    };
  }

  /** @inheritdoc */
  protected formValid(): boolean {
    // const { username, email, password, confirm_password } = this.state.form;

    // Values are set.
    return true;
    // return ((Validator.set(username) && Validator.set(email)
    // && Validator.set(password) && Validator.set(confirm_password))
    // // Special validations.
    // && (Validator.email(email) && Validator.password(password, 6))
    // // Matching passwords.
    // && (password === confirm_password)) as boolean;
  }

  /** @inheritdoc */
  protected submition(form: Form): void {
    // Object to send.
    const dto = {
      username: form.username,
      email: form.email,
      password: form.password
    };

    // Request the back-end.
    this.api.post<NewUser>('/player', dto)
      .subscribe(user => {
        // store.dispatch(
        //   loginUser({
        //     username: user.username,
        //     token: user.token 
        //   })
        // );

        store.dispatch(push(pathRoutes.home));
      }, e => {
        if (e.error === 'Bad Request') {
          if (e.message) {
            e.message.forEach((message: any) => {
              console.log(message.constraints);
            });
          }
        }

        console.log('Error', e);

        // TODO: Handle errors.
      });
  }

  /** @inheritdoc */
  protected invalidForm(): void {}

  /**
   * Handles form value change.
   * @param key
   */
  private handleChange = (key: keyof(Form)) => (event: React.FormEvent) => {
    const value = (event.target as HTMLInputElement).value;

    this.setState(({ form }: IState) => {
      form[key] = value;

      return { form };
    });
  };

  /** Redirects to the login page. */
  private loginPage = () => store.dispatch(push(pathRoutes.login));

  componentDidMount() {
    this.setState({
      redirect: false
    });
  }

  render() {
    const { classes, t } = this.props;
    const { loading, form } = this.state;

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
          <form>
            <TextField
              label={t('SIGNUP.USERNAME')}
              margin="normal"
              variant="outlined"
              value={form.username}
              onChange={this.handleChange('username')}
              className={classes.input}
            />

            <TextField
              label={t('SIGNUP.EMAIL')}
              margin="normal"
              variant="outlined"
              type="email"
              value={form.email}
              onChange={this.handleChange('email')}
              className={classes.input}
            />

            <TextField
              label={t('SIGNUP.PASSWORD')}
              margin="normal"
              variant="outlined"
              value={form.password}
              type="password"
              onChange={this.handleChange('password')}
              className={classes.input}
            />

            <TextField
              label={t('SIGNUP.CONFIRM_PASSWORD')}
              margin="normal"
              variant="outlined"
              value={form.confirmPassword}
              type="password"
              onChange={this.handleChange('confirmPassword')}
              className={classes.input}
            />

            <Divider className={classes.divider}/>

            <LanguageSelector
              label={t('SIGNUP.LANGUAGE')}
              value={form.language}
              onChange={this.handleChange('language')}
            ></LanguageSelector>

            <Button variant="contained" color="primary" className={classes.button} type="submit">
              {t('SIGNUP.SUBMIT_ACTION')}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

/** Export with material theme and translations. */
export default materialTranslated(SignUp, styles);
