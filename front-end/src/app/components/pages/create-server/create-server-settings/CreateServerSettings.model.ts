import { Theme, createStyles } from '@material-ui/core';

import { TranslateAndStyle } from 'src/utils';
import { Item } from './list-selector/ListSelector.model';

/**
 * Component styling.
 * @param theme 
 */
export const styles = (theme: Theme) => createStyles({
  loader: {
    padding: '35px 0',
    width: '100%',
    textAlign: 'center'
  }
});

/** Props of the component. */
export interface IProps extends TranslateAndStyle<typeof styles> {}

/** State of the component. */
export interface IState {
  bonus: Item[];
  penalty: Item[];
  loading: boolean;
  numberPlayers: number;
}

/** Description of an alteration. */
export interface Alteration {
  name: string;
  key: string;
  description: string;
}

/** List of all the alterations. */
export interface ListAllAlterations {
  bonus: Alteration[];
  penalties: Alteration[];
}

