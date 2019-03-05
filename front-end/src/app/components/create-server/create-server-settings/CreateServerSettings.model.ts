import { Item } from './list-selector/ListSelector.model';

/** Props of the component. */
export interface IProps {}

/** State of the component. */
export interface IState {
  bonus: Item[];
  penalty: Item[];
  numberPlayers: number;
}

