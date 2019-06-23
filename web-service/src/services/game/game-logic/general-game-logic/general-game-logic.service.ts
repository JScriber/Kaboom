import { Injectable } from '@nestjs/common';

// Typing interface.
import { IGameLogicService } from '../game-logic.service.model';

// Entities.
import { Player } from '../../../../redis/entities/player.entity';
import { RunningContest } from '../../../../redis/entities/running-contest.entity';

// Models.
import { Position } from '../models/position.model';
import { Direction } from '../models/direction.model';

// Components.
import { GameBombComponent } from '../components/game-bomb-component/game-bomb-component.service';

/**
 * Implementation of the {@link IGameLogicService} interface.
 */
@Injectable()
export class GeneralGameLogicService implements IGameLogicService {

  constructor(private readonly bombLogic: GameBombComponent) {}

  /** @inheritdoc */
  move = (player: Player, contest: RunningContest, position: Position): RunningContest => {

    player.positionX = position.x;
    player.positionY = position.y;

    // TODO: Add more controls and security rules.

    return contest;
  };

  /** @inheritdoc */
  bomb = async (player: Player, contest: RunningContest, direction: Direction): Promise<RunningContest> => this
    .bombLogic.execute(player, contest, direction);
}
