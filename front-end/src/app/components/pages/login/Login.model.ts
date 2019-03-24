import { TranslateAndStyle } from 'src/utils';
import { Theme, createStyles } from '@material-ui/core';

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: 'auto'
  }
});

/** Props of the component. */
export interface IProps extends TranslateAndStyle<typeof styles> {}

/** State of the login component. */
export interface IState {
  loading: boolean;
}

/** Logged in user. */
export interface LoginUser {
  /** Unique id. */
  id: number;
  /** Unique username. */
  username: string;
  /** Authentification token. */
  token: string;
}
