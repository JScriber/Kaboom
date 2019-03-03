import { WithStyles, Theme } from '@material-ui/core';
import { Item } from './list-selector/ListSelector.model';


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

export enum ExpandedPanel {
  Bonus,
  Penalty
}

export interface IState {
  expanded: ExpandedPanel | null;
  bonus: Item[];
  penalty: Item[];
  numberPlayers: number;
}

