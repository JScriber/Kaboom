import { Injectable } from '@nestjs/common';

// Entities.
import { Player } from '@redis-entity/player.entity';
import { Battlefield } from '@redis-entity/battlefield.entity';
import { Bomb } from '@redis-entity/bomb.entity';

// Models.
import { Position } from '../game-logic/models/position.model';

export enum Data {
  Void = 0,

  // Obstacle that cannot be broken.
  FixedObstacle = 1,

  // Breakable obstacles (states)
  BreakObstacle1 = 2,
  BreakObstacle2 = 3,
  BreakObstacle3 = 4,
  BreakObstacle4 = 5,
  BreakObstacle5 = 6,
  BreakObstacle6 = 7,
  BreakObstacle7 = 8,

  // Base bomb.
  SmallBomb  = 9
}

/**
 * Service for {@link Battlefield} manipulations.
 */
@Injectable()
export class GameBattlefieldService {

  /**
   * Approximation of the position of the {@link Player} on the {@link Battlefield}.
   * @param {Player} player
   * @param {Battlefield} battlefield
   * @returns {Position}
   */
  findPosition(player: Player, battlefield: Battlefield): Position {

    const { positionX, positionY } = player;

    const TILE_WIDTH = battlefield.canvasWidth / (battlefield.width + 2);
    const TILE_HEIGHT = battlefield.canvasHeight / (battlefield.height + 2);

    return {
      x: Math.round(positionX / TILE_WIDTH) - 1,
      y: Math.round(positionY / TILE_HEIGHT) - 1
    };
  }

  /**
   * Says if there's a bomb at the given {@link Position}.
   * @param {Battlefield} battlefield - Checked battlefield.
   * @param {Position} position
   * @returns {boolean}
   */
  hasBomb(battlefield: Battlefield, { x, y }: Position): boolean {
    return Array.from(battlefield.bombs).some(b => b.positionX === x && b.positionY === y);
  }

  /**
   * Get the {@link Bomb bombs} of the {@link Player}.
   * @param battlefield
   * @param player
   * @returns {Promise<Bomb[]>}
   */
  getBombsOfPlayer({ bombs }: Battlefield, { id }: Player): Bomb[] {

    return Array.from(bombs).filter(b => b.owner.id === id);
  }

  /**
   * Serializes the map.
   * @param {Data[][]} map
   * @returns {string} - Matrix representation.
   */
  serialize(map: Data[][]): string {
    let matrixRepresentation = '';

    for (let i = 0; i < map.length; i ++) {
      for (let j = 0; j < map[i].length; j ++) {
        matrixRepresentation += map[i][j];
      }
    }

    return matrixRepresentation;
  }

  /**
   * Deserializes the {@link Battlefield} into a matrix.
   * @param {Battlefield} battlefield
   * @returns {Data[][]}
   */
  deserialize(battlefield: Battlefield): Data[][] {
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
  }
}
