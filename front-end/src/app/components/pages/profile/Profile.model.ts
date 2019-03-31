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
  },
  divider: {
    margin: '10px 0'
  }
});

export interface IProps extends WithStyles<typeof styles>, WithTranslation {}

export interface Form {
  username: string;
  email: string;
  language: Language;
}

export interface Modals {
  newPassword: boolean;
  deleteAccount: boolean;
}

export interface IState {
  anchorEl: any;
  loading: boolean;
  form: Form;
  /** Modal state. */
  modal: Modals;
}

/** User after API update. */
export interface UpdatedUser {
  username: string;
  email: string;
  language: Language;
}
