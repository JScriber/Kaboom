import * as React from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Observable } from 'rxjs';

import './Login.scss';
import { Login } from './login';
import { ApiService } from 'src/app/services/api/api';

/** Type alias for form event. */
type FormEvent = React.FormEvent<HTMLFormElement>;

/** Login component using the Login model. */
export default class LoginComponent extends React.Component<Login.Props, Login.State> {

  /** API request. */
  private apiService: ApiService = ApiService.instance();

  constructor(props: Login.Props) {
    super(props);

    const errors: Login.FormErrors = {},
    form: Login.Form = {
      email: '',
      password: '',
      rememberMe: true
    };

    this.state = { errors, form };
  }

  /** @inheritdoc */
  public render() {
    return (
      <div className='Login row'>
        <Card className='col-6 m-auto p-0'>
          <CardHeader className='purple-card-header text-white' title='Entrez vos identifiants'/>
          <CardContent className='py-4'>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId='email' bsSize='large'>
                <FormControl
                  placeholder='Adresse e-mail'
                  type='email'/>
              </FormGroup>

              <FormGroup controlId='password' bsSize='large'>
                <FormControl
                  placeholder='Mot de passe'
                  type='password'/>
              </FormGroup>

              <FormGroup>
                <label className='checkbox_container'>
                  Se rappeler de moi
                  <input
                    name='rememberMe'
                    value={this.state.form.rememberMe.toString()}
                    type='checkbox'/>
                  <span className='custom_checkbox'/>
                </label>
              </FormGroup>

              <Button
                className='submit_button waves-effect waves-light'
                bsSize='large'
                block={true}
                type='submit'>
                Valider
              </Button>

              <a href='' className='purple_link'>Mot de passe oublié ?</a>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // /**
  //  * Returns whether there are any errors in the errors object that is passed in
  //  * @param {Login.FormErrors} errors - The field errors
  //  * @returns {boolean}
  //  */
  // private hasError(errors: Login.FormErrors): boolean {
  //   let hasError: boolean = false;

  //   Object.keys(errors).map((key: string) => {
  //     if (errors[key].length > 0) {
  //       hasError = true;
  //     }
  //   });

  //   return hasError;
  // }

  /**
   * Handles form submission
   * @param {FormEvent} e - The form event
   */
  private handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (this.formIsValid()) {
      this.submitForm().subscribe((data) => {
        this.setState({
          submitSuccess: true
        });
        console.log('Success', data);
      }, (err) => console.log('Error', err));
    }
  }

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Whether the form is valid or not
   */
  private formIsValid(): boolean {
    // TODO - validate form
    return true;
  }

  /**
   * Submits the form to the API.
   * @returns {Observable<any>} - Whether the form submission was successful or not
   */
  private submitForm(): Observable<any> {
    // TODO: Send real data.
    const data: Login.Api = {
      username: 'Johan doe',
      password: 'root'
    };

    // TODO: Change retrieved type.
    return this.apiService.post<boolean>('/player/login', data);
  }
}
