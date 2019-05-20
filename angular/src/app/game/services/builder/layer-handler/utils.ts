import { IndexMatching, PropertyMatching } from '../map-builder.model';

/**
 * Extracts the indexes.
 * @param {Phaser.Tilemaps.Tilemap} map
 */
export const extractIndexes = ({ properties }: Phaser.Tilemaps.Tilemap): IndexMatching => {
  const matching = {};

  Object.keys(PropertyMatching).forEach(p => matching[p] = extract(PropertyMatching[p], properties));

  return matching as IndexMatching;
};

/**
 * Finds the key in the object and extracts the value.
 * @param {string} key 
 * @param {Object} properties 
 * @returns {number}
 */
function extract(key: string, properties: Object): number {

	let index: number;

	for (const id of Object.keys(properties)) {
		const property = properties[id];

		if (property.type === 'int' && property.name === key) {
			index = property.value;

			break;
		}
	}

	return index + 1;
}
