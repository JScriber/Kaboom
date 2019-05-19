import { Coordinates, Dimensions, NumericMap, Data } from './map-builder.model';

/** Utility class. */
export class NumericMapUtils {

  /**
   * Says if the given point fits in the map.
   * @param {Coordinates} coordinates 
   * @param {NumericMap} map 
   */
  static fitsIn({ x, y }: Coordinates, map: NumericMap): boolean {
    const dimensions = NumericMapUtils.getDimensions(map);

    return x > 0 && x <= dimensions.width && y > 0 && y <= dimensions.height;
  }

  /**
   * Pick a point on the map.
   * Doesn't test if the point exist.
   * @param coordinates 
   * @param map 
   */
  static pick({ x, y }: Coordinates, map: NumericMap): Data {
    return map[y - 1][x - 1];
  }

  /**
   * Says the cell above is empty.
   * @param coordinates
   * @param map
   */
  static isEmpty(coordinates: Coordinates, map: NumericMap): boolean {
    return NumericMapUtils.fitsIn(coordinates, map) &&
        NumericMapUtils.pick(coordinates, map) === Data.Void
  }

  /**
   * Finds the dimensions 
   * @param {NumericMap} map
   * @returns {Dimensions} 
   */
  static getDimensions(map: NumericMap): Dimensions {
    return {
      width: map[0].length,
      height: map.length
    };
  }

  private constructor() {}
}
