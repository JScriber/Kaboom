import { WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TranslateAndStyle } from 'src/utils';

/**
 * Component styling.
 * @param theme 
 */
export const styles = ({ spacing }: Theme) => createStyles({
  fab: {
    position: 'absolute',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2,
  }
});

/**
 * Props of the component.
 */
export interface IProps extends TranslateAndStyle<typeof styles> {}

/**
 * State of the component.
 */
export interface IState {
  /** Tab index. */
  value: number;

  /** Selected map. */
  selectedId: number | null;

  /** Default maps loaded. */
  defaultMapsLoaded: boolean;

  /** Default maps. */
  defaultMaps: MapPreview[];

  /** Custom maps loaded. */
  customMapsLoaded: boolean;

  /** Custom maps. */
  customMaps: MapPreview[];
}

/** Preview of a map. */
export interface MapPreview {
  /** Technical id. */
  id: number;
  name: string;
}
