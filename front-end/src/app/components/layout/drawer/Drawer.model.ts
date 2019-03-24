import { WithStyles, Theme } from '@material-ui/core';
import { WithTranslation } from 'react-i18next';

/** Width of the drawer. */
export const drawerWidth = 260;

export const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

/** Representation of a link. */
export interface Link {
  name: string;
  icon: any;
  link: string;
}

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles>, WithTranslation {
  open: boolean;
  location: string;
}

