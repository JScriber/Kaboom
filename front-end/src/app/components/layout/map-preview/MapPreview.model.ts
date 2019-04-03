import { WithStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {
  dimensions: string;
}

/** State of the component. */
export interface IState {}

