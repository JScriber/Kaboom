import { Theme, createStyles } from '@material-ui/core';
import { FormikProps } from 'formik';

import { TranslateAndStyle } from 'src/utils';

/** Content of the form. */
export interface Form {
  username: string;
  password: string;
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
  }
});

/** Props of the component. */
export interface IProps extends TranslateAndStyle<typeof styles>, FormikProps<Form> {}
