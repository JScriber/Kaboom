import { WithStyles, Theme } from '@material-ui/core';

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
  
}

export interface IState {
}
