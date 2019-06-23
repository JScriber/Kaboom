import { Injectable } from '@nestjs/common';
import { ILogicComponent } from '../logic-component.model';

// Repositories.
import { BombRepository } from '@redis-repository/bomb-repository/bomb-repository.service';

// Entities.
import { RunningContest } from '@redis-entity/running-contest.entity';
import { Battlefield } from '@redis-entity/battlefield.entity';
import { Player } from '@redis-entity/player.entity';
import { Bomb } from '@redis-entity/bomb.entity';

// Services.
import { GameBattlefieldService, Data } from '../../../game-battlefield/game-battlefield.service';

// Models.
import { Vector } from '../../models/vector.model';
import { Direction } from '../../models/direction.model';
import { Position } from '../../models/position.model';

/**
 * Logic related to bombs.
 */
@Injectable()
export class GameBombComponent implements ILogicComponent<Direction> {

  constructor(private readonly battlefield: GameBattlefieldService,
              private readonly bombRepository: BombRepository) {}

  /** @inheritdoc */
  async execute(player: Player, contest: RunningContest, data: Direction): Promise<RunningContest> {
    const { battlefield } = contest;

    // Determine the position of the bomb.
    const position = this.findBombPosition(data, player, battlefield);

    // Deserialize the map.
    const map = this.battlefield.deserialize(battlefield);

    // The place mustn't be taken nor contain another bomb.
    if (map[position.y][position.x] === Data.Void && !this.battlefield.hasBomb(battlefield, position)) {

      // Get a list of the bombs of the player.
      const playerBombs = this.battlefield.getBombsOfPlayer(battlefield, player);

      if (playerBombs.length < player.maxBombs) {

        // Create the bomb.
        const bomb = await this.createBomb(position, player);

        // Attach the bomb to the battlefield.
        battlefield.bombs.add(bomb);
  
        console.log(`Player ${player.id} put a bomb`, position);
      }
    }

    return contest;
  }

  /**
   * Creates a new bomb at the given coordinates.
   * @param position - Position of the bomb.
   * @param player - Player who puts the bomb.
   * @returns the created bomb.
   */
  private async createBomb(position: Position, player: Player): Promise<Bomb> {
    const bomb = new Bomb();
  
    bomb.positionX = position.x;
    bomb.positionY = position.y;
    bomb.owner = player;
    bomb.putAt = new Date().toISOString();

    // TODO: Extract these base informations somewhere.
    bomb.blast = 3;
    bomb.countdown = 3000;

    return this.bombRepository.save(bomb);
  }

  /**
   * Determines the position of the bomb based on the position of the {@link Player}.
   * @param {Direction} direction
   * @param {Player} player
   * @param {Battlefield} battlefield
   * @returns {Position}
   */
  private findBombPosition(direction: Direction, player: Player, battlefield: Battlefield): Position {
    
    let position = this.battlefield.findPosition(player, battlefield);

    let vector: Vector = { x: 0, y: 0 };

    switch (direction) {
      case Direction.Left:
        vector = { x: -1, y: 0 };
        break;

      case Direction.Right:
        vector = { x: 1, y: 0 };
        break;

      case Direction.Up:
        vector = { x: 0, y: -1 };
        break;

      case Direction.Down:
        vector = { x: 0, y: 1 };
        break;
    }

    position.x += vector.x;
    position.y += vector.y;

    return position;
  }
}
