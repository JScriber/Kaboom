import { WithStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    alignSelf: 'center'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    alignSelf: 'center',
    marginLeft: '20px'
  },
  slider: {
    padding: '22px 0px',
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {
  initialValue: number;
  min: number;
  max: number;
  title: string;
  expanded: boolean;
  togglable: boolean;
  displaying: (value: number) => string;
}

/** State of the component. */
export interface IState {
  toggled: boolean;
  expanded: boolean;
  value: number;
}
