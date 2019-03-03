import { WithStyles, Theme } from '@material-ui/core';

export enum Duration {
  S_10,
  None
}

export interface Item {
  name: string;
  description: string;
  duration: Duration;
  toggled: boolean;
}

export const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    alignSelf: 'center'
  }
});

export interface IProps extends WithStyles<typeof styles> {
  title: string;
  items: Item[];
}

export interface IState {
  expanded: boolean;
  items: Item[];
}
