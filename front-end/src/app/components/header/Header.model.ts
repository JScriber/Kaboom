import { WithStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    marginBottom: '20px'
  },
  grow: {
    flexGrow: 1,
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {}

/** State of the component. */
export interface IState {
  authentificated: boolean;
  anchorEl: any;
}
