import { WithStyles, Theme } from '@material-ui/core';

/** Duration of an item. */
export enum Duration {
  /** Last 10 seconds. */
  S_10,

  /** No duration. */
  None
}

/** Item to select. */
export interface Item {
  /** Name of the option. */
  name: string;

  /** Description of the option. */
  description: string;

  /** Maximum duration. */
  duration: Duration;

  /** Toggled or not. */
  toggled: boolean;
}

/** Custom material CSS. */
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

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {
  title: string;
  items: Item[];
}

/** State of the component. */
export interface IState {
  expanded: boolean;
  items: Item[];
}
