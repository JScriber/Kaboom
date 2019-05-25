import Item from './item';
import Player from './player';
import Dimensions from './physics/dimensions/dimensions';

/** Empty slot. */
declare type Empty = null;

export default interface Map {
  /** 2D representation of the map. */
  slots: (Player | Item | Empty)[][];

  /** Dimensions of the map. */
  dimensions: Dimensions;
}
