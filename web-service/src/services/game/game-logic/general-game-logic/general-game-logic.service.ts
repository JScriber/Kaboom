import { Injectable } from '@nestjs/common';

// Typing interface.
import { IGameLogicService } from '../game-logic.service.model';

// Entities.
import { Player } from '../../../../redis/entities/player.entity';
import { RunningContest } from '../../../../redis/entities/running-contest.entity';

// Models.
import { Position } from '../models/position.model';
import { Direction } from '../models/direction.model';
import { GameBattlefieldService } from '../../game-battlefield/game-battlefield.service';

/**
 * Implementation of the {@link IGameLogicService} interface.
 */
@Injectable()
export class GeneralGameLogicService implements IGameLogicService {

  constructor(private readonly battlefield: GameBattlefieldService) {}

  /** @inheritdoc */
  move = (player: Player, contest: RunningContest, position: Position): RunningContest => {

    const current = this.currentPlayer(player, contest);

    current.positionX = position.x;
    current.positionY = position.y;

    // TODO: Add more controls and security rules.

    return contest;
  };

  /** @inheritdoc */
  bomb = (player: Player, contest: RunningContest, direction: Direction): RunningContest => {

    console.log('Player ' + player.id + ' put a bomb: ', this.battlefield.findPosition(player, contest.battlefield));

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
