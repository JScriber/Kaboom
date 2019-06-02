import { Map } from "@entity/map.entity";

export interface IMapService {

  /**
   * Finds a {@link Map} by its id.
   * @param {number} id
   * @returns {Promise<Map | undefined>}
   */
  findOne(id: number): Promise<Map | undefined>;
}
