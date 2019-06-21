import { Injectable } from '@nestjs/common';
import { Battlefield } from '../../../redis/entities/battlefield.entity';
import { Player } from '../../../redis/entities/player.entity';
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
   * Parses the {@link Battlefield} into a matrix.
   * @param {Battlefield} battlefield
   * @returns {Data[][]}
   */
  parse(battlefield: Battlefield): Data[][] {
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
