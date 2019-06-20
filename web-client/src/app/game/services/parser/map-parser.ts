import { Battlefield } from '../communication/models/battlefield.model';
import { Data } from '../builder/map-builder.model';

/**
 * Maps the battlefield into an applicable map.
 * @param battlefield
 * @returns {Data[][]}
 */
export const mapParser = (battlefield: Battlefield): Data[][] => {
  const map: Data[][] = [];

  const { width, height, matrixRepresentation } = battlefield;

  if (width * height === matrixRepresentation.length) {
    const datas: Data[] = matrixRepresentation.split('')
      .map(char => Number.parseInt(char) as Data);

    for (let i = 0; i < height; i ++) {
      const row: Data[] = [];

      for (let j = 0; j < width; j ++) {
        row.push(datas[(i * width) + j]);
      }

      map.push(row);
    }
  }

  return map;
};
