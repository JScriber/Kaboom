import { Theme, WithStyles } from '@material-ui/core';
import { drawerWidth } from './components/layout/drawer/Drawer.model';

export const styles = (theme: Theme) => ({
  app: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 80,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

export interface IProps extends WithStyles<typeof styles> {}

export interface IState {
  location: string;
  authentificated: boolean;
  drawerOpen: boolean;
}

