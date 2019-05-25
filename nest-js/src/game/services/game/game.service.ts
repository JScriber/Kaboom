import { Injectable } from '@nestjs/common';

import { Vector } from '../../model/physics/vector/vector';
import Player from '../../model/player';
import Game from '../../model/game';

export interface Movement {
  direction: Vector,
  speed: number;
}

@Injectable()
export class GameService {

  /**
   * Movement.
   * @param {Player} player 
   * @param {Game} game
   * @param {Movement} data
   * @returns {Game}
   */
  move(player: Player, game: Game, data: Movement): Game {
    // TODO: Game treatment.
    console.log(player, data);

    return game;
  }
}
