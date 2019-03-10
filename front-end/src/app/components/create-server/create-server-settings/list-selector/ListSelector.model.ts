import { WithStyles, Theme } from '@material-ui/core';

/** Item to select. */
export interface Item {
  /** Name of the option. */
  name: string;

  /** Technical key of the item. */
  key: string;

  /** Description of the option. */
  description: string;

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
  },
  panel: {
    display: 'flex',
    flexFlow: 'column wrap',
    paddingTop: 0
  },
  secondaryText: {
    opacity: .6
  },
  divider: {
    marginBottom: 5
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {
  title: string;
  placeholder: string;
  items: Item[];
}

/** State of the component. */
export interface IState {
  expanded: boolean;
  filter: string | null;
  items: Item[];
}
