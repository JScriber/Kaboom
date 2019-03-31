import { WithStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    width: 100,
    height: 100,
    backgroundColor: theme.palette.primary.main
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {}

/** State of the component. */
export interface IState {}

