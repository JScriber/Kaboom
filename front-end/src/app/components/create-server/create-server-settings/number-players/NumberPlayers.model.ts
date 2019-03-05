import { WithStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  slider: {
    padding: '22px 0px',
  }
});

/** Props of the component. */
export interface IProps extends WithStyles<typeof styles> {
  min: number;
  max: number;
  default: number;
}

/** State of the map list. */
export interface IState {
  numberPlayers: number;
}
