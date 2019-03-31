import { Theme, createStyles } from '@material-ui/core';
import { FormikProps } from 'formik';

import { TranslateAndStyle } from 'src/utils';

/** Content of the form. */
export interface Form {
  oldPassword: string;
  newPassword: string;
}

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  input: {
    width: '100%'
  },
  button: {
    marginTop: 12,
    width: '100%'
  },
  divider: {
    margin: '10px 0'
  },
  description: {
    marginBottom: 13
  }
});

/** Props of the component. */
export interface IProps extends TranslateAndStyle<typeof styles>, FormikProps<Form> {
  generatePassword: () => string;
  onClose: () => void;
}

export interface IState {
  showOldPassword: boolean;
  showNewPassword: boolean;
}