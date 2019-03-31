import { MapPreview } from '../CreateServerMap.model';
import { Theme, WithStyles } from '@material-ui/core';
import * as Color from 'color';

export const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    borderRadius: 5,
    padding: '12px 15px'
  },
  label: {
    paddingTop: 10
  },
  selected: {
    backgroundColor: Color(theme.palette.background.default).darken(.05).string(),
    color: theme.palette.primary.main
  }
});

export interface IProps extends WithStyles<typeof styles> {
  selected: boolean;
  map: MapPreview;
  onSelect: (id: number) => void;
}

export interface IState {
  selected: boolean;
  map: MapPreview;
}
