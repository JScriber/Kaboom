import { Item } from './list-selector/ListSelector.model';

/** Props of the component. */
export interface IProps {}

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

