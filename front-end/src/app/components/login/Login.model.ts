import * as F from '../form/Form.model';
import { TranslateAndStyle } from 'src/utils';
import { Theme, createStyles } from '@material-ui/core';

export interface Form extends F.Form {
  username: string;
  password: string;
}

export interface FormErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
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
  divider: {
    margin: '10px 0'
  }
});

/** Props of the component. */
export interface IProps extends TranslateAndStyle<typeof styles> {
  /** The HTTP path that the form will be posted to. */
  action: string;
}

/** State of the login component. */
export interface IState {
  /* The field values. */
  form: Form;

  /* The field validation error messages. */
  errors: FormErrors;

  /* Whether the form has been successfully submitted. */
  submitSuccess?: boolean;

  loading: boolean;
}

export interface Api {
  username: string;
  password: string;
}
