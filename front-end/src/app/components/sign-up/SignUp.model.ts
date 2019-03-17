import * as F from '../form/Form.model';
import { WithStyles, Theme, createStyles } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';
import { Language } from 'src/translation/translation';

export interface Form extends F.Form {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  language: Language;
}

export interface FormErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
}

/** State of component. */
export interface IState {
  loading: boolean;
}

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles>, WithTranslation {
  /** The HTTP path that the form will be posted to. */
  action: string;
}

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: 'auto'
  },
  input: {
    width: '100%'
  },
  button: {
    marginTop: 12,
    width: '100%'
  },
});


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
