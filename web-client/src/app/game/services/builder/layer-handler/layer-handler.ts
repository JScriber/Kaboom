import { IndexMatching, Coordinates } from '../map-builder.model';
import { extractIndexes } from './utils';

/** Layer access. */
export enum Layer {
  Obstacle,
  Shadow
}

/**
 * Class that manipulates the layer.
 * Is responsible of managing the tiles of the layers.
 */
export class LayerHandler {

  /** Properties of the map. */
  private properties: IndexMatching;

  /** Constructor. */
  constructor(map: Phaser.Tilemaps.Tilemap,
              private readonly obstacles: Phaser.Tilemaps.DynamicTilemapLayer,
              private readonly shadows: Phaser.Tilemaps.DynamicTilemapLayer) {

    this.properties = extractIndexes(map);
  }

  /**
   * Puts a new tile.
   * @param {Layer} layer
   * @param {Coordinates} coordinates 
   * @param {keyof IndexMatching} property 
   */
  addTile(layer: Layer, { x, y }: Coordinates, property: keyof IndexMatching) {

    // Layer on which the tile will be created.
    const tilemap = this.selectLayer(layer);

    // Index of the tile (on image).
    const index = this.properties[property];

    // Create the tile.
    const tile = new Phaser.Tilemaps.Tile(tilemap.layer, index, x, y, 16, 16, 16, 16);

    // Check if the item can be collided.
    if ((['fixedObstacle', 'breakObstacle7', 'breakObstacle6',
         'breakObstacle5', 'breakObstacle4', 'breakObstacle3',
         'breakObstacle2', 'breakObstacleShadowed', 'smallBomb'
        ] as (keyof IndexMatching)[]).includes(property)) {
      tile.properties = { collides: true };
    }
  
    // Put the tile on the layer.
    tilemap.putTileAt(tile, x, y);
  }

  /**
   * Removes a tile from the layer.
   * @param {Layer} layer
   * @param {Coordinates} coordinates
   */
  removeTile(layer: Layer, { x, y }: Coordinates) {

    // Layer on which the tile will be removed.
    const tilemap = this.selectLayer(layer);

    // Remove the tile from the layer.
    tilemap.removeTileAt(x, y);
  }

  /** Clears out all the layers. */
  clearLayers() {
    this.obstacles.culledTiles = [];
    this.shadows.culledTiles = [];
  }

  /**
   * Determines which concrete layer to use.
   * @param {Layer} layer
   * @returns {Phaser.Tilemaps.DynamicTilemapLayer}
   */
  private selectLayer(layer: Layer): Phaser.Tilemaps.DynamicTilemapLayer {
    let selected;

    switch (layer) {
      case Layer.Obstacle:
        selected = this.obstacles;
        break;

      case Layer.Shadow:
        selected = this.shadows;
        break;
    }

    return selected;
  }
}
