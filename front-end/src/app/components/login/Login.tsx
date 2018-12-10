import * as React from 'react';
import { Button, FormControl, FormGroup } from 'react-bootstrap';

import './Login.scss';

// TODO: Move all those interfaces out of this file.
interface IFormProps {
  /* The http path that the form will be posted to */
  action: string;
}

export interface IFormValues {
  /* Key value pairs for all the field values with key being the field name */
  [key: string]: any;
}

export interface IFormErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
}

export interface IFormState {
  /* The field values */
  values: IFormValues;

  /* The field validation error messages */
  errors: IFormErrors;

  /* Whether the form has been successfully submitted */
  submitSuccess?: boolean;
}

export default class Login extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const errors: IFormErrors = {};
    const values: IFormValues = {};
    this.state = {
      errors,
      values
    };
  }

  // /**
  //  * Returns whether there are any errors in the errors object that is passed in
  //  * @param {IErrors} errors - The field errors
  //  */
  // private haveErrors(errors: IFormErrors) {
  //   let haveError: boolean = false;
  //   Object.keys(errors).map((key: string) => {
  //     if (errors[key].length > 0) {
  //       haveError = true;
  //     }
  //   });
  //   return haveError;
  // }

  // /**
  //  * Handles form submission
  //  * @param {React.FormEvent<HTMLFormElement>} e - The form event
  //  */
  // private handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> => {
  //   e.preventDefault();
  //
  //   if (this.validateForm()) {
  //     const submitSuccess: boolean = await this.submitForm();
  //     this.setState({submitSuccess});
  //   }
  // };

  // /**
  //  * Executes the validation rules for all the fields on the form and sets the error state
  //  * @returns {boolean} - Whether the form is valid or not
  //  */
  // private validateForm(): boolean {
  //   // TODO - validate form
  //   return true;
  // }
  //
  // /**
  //  * Submits the form to the http api
  //  * @returns {boolean} - Whether the form submission was successful or not
  //  */
  // private async submitForm(): Promise<boolean> {
  //   // TODO - submit the form
  //   return true;
  // }

  public render() {

    return (
      <div className="Login">
        <form>
          <FormGroup controlId="email" bsSize="large">
            <FormControl
              placeholder="Adresse e-mail"
              type="email"
              value=""
            />
          </FormGroup>
          < FormGroup controlId="password" bsSize="large">
            <FormControl
              placeholder="Mot de passe"
              type="password"
            />
          </FormGroup>
          < FormGroup>
            <label className="checkbox_container"> Se rappeler de moi
              <input
                name="rememberMe"
                type="checkbox"/>
              <span className="custom_checkbox"/>
            </label>
          </FormGroup>

          <Button
            className="submit_button"
            bsSize="large"
            block={true}
            type="submit">
            Valider
          </Button>

          <a href="" className="purple_link">Mot de passe oublié ?</a>
        </form>
      </div>

    );
  }
}
