import { Coordinates, Data, NumericMap } from './map-builder.model';
import { NumericMapUtils } from './map-data';
import { LayerHandler, Layer } from './layer-handler/layer-handler';

export class MapBuilder {

  /** Responsible of tiles management. */
  private readonly layer: LayerHandler;

  /** Constructor. */
  constructor(map: Phaser.Tilemaps.Tilemap,
              obstacles: Phaser.Tilemaps.DynamicTilemapLayer,
              shadows: Phaser.Tilemaps.DynamicTilemapLayer) {

    this.layer = new LayerHandler(map, obstacles, shadows);
  }

  /**
   * Draws the given map.
   * @param map 
   */
  drawData(map: NumericMap) {

    this.layer.clearLayers();

    for (let i = 0; i < map.length; i ++) {
      for (let j = 0; j < map[0].length; j ++) {
        const data = map[i][j];
        const x = j + 1;
        const y = i + 1;

        switch (data) {
          // Fixed obstacle generation.
          case Data.FixedObstacle:
            this.generateFixedObstacle({ x, y }, map);
            break;

          case Data.BreakObstacle7:
          case Data.BreakObstacle6:
          case Data.BreakObstacle5:
          case Data.BreakObstacle4:
          case Data.BreakObstacle3:
          case Data.BreakObstacle2:
          case Data.BreakObstacle1:
            this.generateBreakObstacle({ x, y }, data - Data.BreakObstacle1 + 1, map);

          default:
            break;
        }
      }
    }
  }

  /**
   * Adds a fixed obstacle on the map.
   * @param {Coordinates} coordinates
   * @param {NumericMap} map 
   */
  private generateFixedObstacle(coordinates: Coordinates, map: NumericMap) {

    this.layer.addTile(Layer.Obstacle, coordinates, 'fixedObstacle');

    // Determine if need shadow.
    coordinates.y ++;

    if (NumericMapUtils.isEmpty(coordinates, map)) {

      this.layer.addTile(Layer.Shadow, coordinates, 'fixedObstacleShadow');
    }
  }

  /**
   * Generates a breakable obstacle.
   * @param {Coordinates} coordinates
   * @param {number} state - From 1 to 7.
   * @param {NumericMap} map 
   */
  private generateBreakObstacle(coordinates: Coordinates, state: number, map: NumericMap) {

    if (state === 7) {
      const up = { ...coordinates, y: coordinates.y - 1 };
      const down = { ...coordinates, y: coordinates.y + 1 };

      if (NumericMapUtils.isEmpty(up, map)) {
        this.layer.addTile(Layer.Obstacle, coordinates, 'breakObstacle7');
      } else {
        this.layer.addTile(Layer.Obstacle, coordinates, 'breakObstacleShadowed');
      }

      if (NumericMapUtils.isEmpty(down, map)) {
        this.layer.addTile(Layer.Shadow, down, 'breakObstacleShadow');
      }
    } else {
      this.layer.addTile(Layer.Obstacle, coordinates, ('breakObstacle' + state) as any);
    }
  }
}
