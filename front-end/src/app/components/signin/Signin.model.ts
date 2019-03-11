import * as F from '../form/Form.model';

export interface Form extends F.Form {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface FormErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
}

/** State of the Signin component. */
export interface State {
  /* The field values. */
  form: Form;

  /* The field validation error messages. */
  errors: FormErrors;

  /* Whether the form has been successfully submitted. */
  submitSuccess?: boolean;
}

/** Props of the signin component. */
export interface Props {
  /** The HTTP path that the form will be posted to. */
  action: string;
}

export interface Api {
  username: string;
  password: string;
}

/** New user after sign in. */
export interface NewUser {
  /** Unique id. */
  id: number;
  /** Email address. */
  email: string;
  /** Unique username. */
  username: string;
  /** Date at which the user has been created. */
  createdAt: string;
  /** Authentification token. */
  token: string;
}
