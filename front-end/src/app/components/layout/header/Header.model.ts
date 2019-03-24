import { WithStyles, Theme } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';

export const styles = (theme: Theme) => ({
  root: {
    marginBottom: '20px',
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 20,
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles>, WithTranslation {
  /** User is authentificated. */
  authentificated: boolean;

  /** Toggles the drawer. */
  toggleDrawer: () => void;

  /** Sets the state of the drawer. */
  setDrawer: (state: boolean) => void;
}

/** State of the component. */
export interface IState {
  anchorEl: any;
}
