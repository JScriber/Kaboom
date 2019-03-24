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
  toggleDrawer: () => void;
}

/** State of the component. */
export interface IState {
  authentificated: boolean;
  anchorEl: any;
}
