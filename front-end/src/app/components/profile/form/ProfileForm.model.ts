import { Theme, createStyles } from '@material-ui/core';
import { FormikProps } from 'formik';

import { TranslateAndStyle } from 'src/utils';
import { Language } from 'src/translation/translation';

/** Content of the form. */
export interface Form {
  username: string;
  email: string;
  language: Language;
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
  }
});

/** Props of the component. */
export interface IProps extends TranslateAndStyle<typeof styles>, FormikProps<Form> {}
