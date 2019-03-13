import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { Button, Card, CardContent, CardHeader, Paper } from '@material-ui/core';

import './Login.scss';
import * as Login from './login.model';
import { pathRoutes } from 'src/root.routes';
import { store } from 'src/app/redux';
import { push } from 'connected-react-router';
import { loginUser } from 'src/app/redux/user/actions/login';
import { FormComponent } from '../form/Form';

/** Login component using the Login model. */
class LoginComponent extends FormComponent<Login.Props, Login.State> {

  /** @inheritdoc */
  protected formBuilder(): Login.Form {
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
  private signInView = () => store.dispatch(push(pathRoutes.signin));

  /** @inheritdoc */
  public render() {
    return (
      <div className='Login row'>
        <Card className='col-6 mx-auto p-0'>
          <CardHeader className='purple-card-header text-white' title='Entrez vos identifiants'/>
          <CardContent className='py-4'>
            <form className='col-8 mx-auto' onSubmit={this.submit}>
              <FormGroup controlId='username' bsSize='large'>
                <FormControl
                  placeholder='Nom utilisateur'
                  name='username'
                  onChange={this.formChange}
                  type='text'/>
              </FormGroup>

              <FormGroup controlId='password' bsSize='large'>
                <FormControl
                  placeholder='Mot de passe'
                  name='password'
                  onChange={this.formChange}
                  type='password'/>
              </FormGroup>

              <Button variant="contained" color="primary" type="submit">
                Se connecter
              </Button>

              <Button focusRipple color="primary" onClick={this.signInView}>
                Vous n'avez pas de compte ?
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  /** @inheritdoc */
  protected submition(): void {
    const data: Login.Api = {
      username: this.state.form.username,
      password: this.state.form.password
    };

    this.api.post<string>('/player/login', data).subscribe((token) => {
      store.dispatch(
        loginUser({
          username: data.username,
          token 
        })
      );

      store.dispatch(push(pathRoutes.home));
    }, (err) => console.log('Error', err));
  }
}

export default LoginComponent;
