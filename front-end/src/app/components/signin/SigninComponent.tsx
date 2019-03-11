import * as React from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';
import {Button, CardContent, CardHeader, Paper} from '@material-ui/core';
import Card from '@material-ui/core/Card';

import './Signin.scss';
import * as SignIn from './Signin.model';
import { FormComponent } from '../form/Form';
import { loginUser } from 'src/app/redux/user/actions/login';
import { store } from 'src/app/redux';
// import { Validator } from '../form/Validators';

class SigninComponent extends FormComponent<SignIn.Props, SignIn.State> {

  /** @inheritdoc */
  protected formBuilder(): SignIn.Form {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
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
  protected submition(form: SignIn.Form): void {
    // Object to send.
    const dto = {
      username: form.username,
      email: form.email,
      password: form.password
    };

    
    
    // Request the back-end.
    this.api.post<SignIn.NewUser>('/player', dto)
    .subscribe(user => {
      store.dispatch(loginUser({
        username: user.username,
        token: user.token 
      }));
        // TODO: Redirect to other page.
      }, e => {
        if (e.error === 'Bad Request') {
          if (e.message) {
            e.message.forEach((message: any) => {
              console.log(message.constraints);
            });
          }
        }

        // TODO: Handle errors.
      });
  }

  /** @inheritdoc */
  protected invalidForm(): void {}

  public render(): JSX.Element {
    return (
      <div className='Signin row'>
        <Card className='col-6 mx-auto p-0'>
          <CardHeader className='purple-card-header text-white' title='Entrez vos informations'/>
          <CardContent className='py-4 row'>
            <form className='col-8 mx-auto' onSubmit={this.submit}>
              <FormGroup controlId='username' bsSize='large'>
                <FormControl
                  name='username'
                  onChange={this.formChange}
                  placeholder='Nom'
                  type='text'
                />
              </FormGroup>
              <FormGroup controlId='email' bsSize='large'>
                <FormControl
                  name='email'
                  onChange={this.formChange}
                  placeholder='Adresse e-mail'
                  type='email'
                />
              </FormGroup>
              < FormGroup controlId='password' bsSize='large'>
                <FormControl
                  name='password'
                  onChange={this.formChange}
                  placeholder='Mot de passe'
                  type='password'
                />
              </FormGroup>
              < FormGroup controlId='password-confirm' bsSize='large'>
                <FormControl
                  name='confirm_password'
                  onChange={this.formChange}
                  placeholder='Confirmez votre mot de passe'
                  type='password'
                />
              </FormGroup>

              <Paper elevation={2} className='col-6 mx-auto p-0'>
                <Button
                  className='submit_button purple-button waves-effect waves-light col'
                  variant='contained'
                  type='submit'>
                  Valider
                </Button>
              </Paper>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SigninComponent;
