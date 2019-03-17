import * as React from 'react';
import { Button, Card, CardContent, CardHeader, LinearProgress, Tooltip, IconButton, TextField } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';
import { push } from 'connected-react-router';
import { FormComponent } from '../form/Form';
import { materialTranslated } from 'src/utils';

// Model.
import { IState, IProps, Form, Api, styles } from './Login.model';

/** Login component using the Login model. */
class Login extends FormComponent<IProps, IState> {

  /** @inheritdoc */
  protected formBuilder(): Form {
    return {
      username: '',
      password: ''
    };
  }

  /** @inheritdoc */
  protected formValid(): boolean {
    return true;
  }

  /** @inheritdoc */
  protected invalidForm(): void {}

  /** Redirects to sign in view. */
  private signUpPage = () => store.dispatch(push(pathRoutes.signUp));

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

  /** @inheritdoc */
  public render() {
    const { classes, t } = this.props;
    const { loading, form } = this.state;

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
          <form onSubmit={this.submit}>
            <TextField
              label={t('LOGIN.USERNAME')}
              margin="normal"
              variant="outlined"
              value={form.username}
              onChange={this.handleChange('username')}
              className={classes.input}
            />

            <TextField
              label={t('LOGIN.PASSWORD')}
              margin="normal"
              variant="outlined"
              value={form.password}
              type="password"
              onChange={this.handleChange('password')}
              className={classes.input}
            />

            <Button variant="contained" color="primary" className={classes.button} type="submit">
              {t('LOGIN.SUBMIT_ACTION')}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  /** @inheritdoc */
  protected submition(): void {
    const data: Api = {
      username: this.state.form.username,
      password: this.state.form.password
    };

    this.api.post<string>('/player/login', data).subscribe((token) => {
      store.dispatch(push(pathRoutes.home));
    }, (err) => console.log('Error', err));
  }
}

/** Export with material theme and translations. */
export default materialTranslated(Login, styles);
