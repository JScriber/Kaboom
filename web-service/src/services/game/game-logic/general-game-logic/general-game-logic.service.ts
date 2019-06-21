import { Injectable } from '@nestjs/common';

// Typing interface.
import { IGameLogicService } from '../game-logic.service.model';

// Entities.
import { Player } from '../../../../redis/entities/player.entity';
import { RunningContest } from '../../../../redis/entities/running-contest.entity';

// Models.
import { Vector } from '../models/vector.model';

/**
 * Implementation of the {@link IGameLogicService} interface.
 */
@Injectable()
export class GeneralGameLogicService implements IGameLogicService {

  /** @inheritdoc */
  move = (player: Player, contest: RunningContest, direction: Vector): RunningContest => {

    const current = this.currentPlayer(player, contest);

    current.positionX = direction.x;
    current.positionY = direction.y;

    return contest;
  };

  /**
   * Gets the current player. The given player cannot be used directly
   * as its reference may be different of the one in the player set.
   * @param {Player} player 
   * @param {RunningContest} contest
   * @returns {Player}
   */
  private currentPlayer({ id }: Player, contest: RunningContest) {
    return Array.from(contest.players).find(p => p.id === id);
  }
}
