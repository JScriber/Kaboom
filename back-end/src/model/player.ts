import Item from './item';
import Positions from './physics/positions/positions';

export default interface Player {
  id: number;
  uuid: string;
  position: Positions;
  items: Item[];
}
