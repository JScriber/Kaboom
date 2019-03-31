import { MapPreview } from '../CreateServerMap.model';
import { Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  grid: {
    display: 'flex',
    justifyContent: 'center'
  },
  gridContainer: {
    width: 'auto',
    margin: 'auto'
  }
});

/** Props of the map list. */
export interface IProps extends WithStyles<typeof styles> {
  selectedId: number | null;
  previews: MapPreview[];
  onSelect: (id: number | null) => void;
}

/** State of the map list. */
export interface IState {
  selectedId: number | null;
  previews: MapPreview[]
}
