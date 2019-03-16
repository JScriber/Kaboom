import { Theme, createStyles, WithStyles } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';
import { Language } from 'src/translation/translation';

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
    marginBottom: 12,
  }
});

export interface IProps extends WithStyles<typeof styles>, WithTranslation {}

export interface Form {
  username: string;
  email: string;
  language: Language;
}

export interface IState {
  anchorEl: any;
  form: Form;
}
