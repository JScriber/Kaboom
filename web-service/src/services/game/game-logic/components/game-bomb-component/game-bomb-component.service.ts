import { Injectable } from '@nestjs/common';
import { ILogicComponent } from '../logic-component.model';

// Repositories.
import { BombRepository } from '@redis-repository/bomb-repository/bomb-repository.service';
import { BattlefieldRepository } from '@redis-repository/battlefield-repository/battlefield.repository';

// Entities.
import { RunningContest } from '@redis-entity/running-contest.entity';
import { Battlefield } from '@redis-entity/battlefield.entity';
import { Player } from '@redis-entity/player.entity';
import { Bomb } from '@redis-entity/bomb.entity';

// Services.
import { GameBattlefieldService, Data } from '../../../game-battlefield/game-battlefield.service';
import { GameSchedulerService } from '../../../game-scheduler/game-scheduler.service';

// Models.
import { Vector, directionToVector } from '../../models/vector.model';
import { Direction } from '../../models/direction.model';
import { Position } from '../../models/position.model';
import { GamePlayerService } from '../../../game-player/game-player.service';
import { GameBombBlastService } from './game-bomb-blast/game-bomb-blast.service';

/**
 * Logic related to bombs.
 */
@Injectable()
export class GameBombComponent implements ILogicComponent<Direction> {

  constructor(private readonly battlefieldService: GameBattlefieldService,
              private readonly battlefieldRepository: BattlefieldRepository,
              private readonly bombRepository: BombRepository,
              private readonly scheduler: GameSchedulerService,

              private readonly bombExplosion: GameBombBlastService) {}

  /** @inheritdoc */
  async execute(player: Player, contest: RunningContest, data: Direction): Promise<RunningContest> {
    const { battlefield } = contest;

    // Determine the position of the bomb.
    const position = this.findBombPosition(data, player, battlefield);

    // Deserialize the map.
    const map = this.battlefieldService.deserialize(battlefield);

    // The place mustn't be taken nor contain another bomb.
    if (map[position.y][position.x] === Data.Void && !this.battlefieldService.hasBomb(battlefield, position)) {

      // Get a list of the bombs of the player.
      const playerBombs = this.battlefieldService.getBombsOfPlayer(battlefield, player);

      if (playerBombs.length < player.maxBombs) {

        // Create the bomb.
        const bomb = await this.createBomb(position, player);

        // Attach the bomb to the battlefield.
        battlefield.bombs.add(bomb);

        // Set the action.
        this.scheduler.schedule(contest, async () => await this.explodeBomb(bomb.id, contest),
          { repeat: false, interval: bomb.countdown });

        console.log(`Player ${player.id} put a bomb`, position);
      }
    }

    return contest;
  }

  /**
   * Makes the bomb explode.
   * @param bomb
   * @param contest 
   */
  private async explodeBomb(id: number, contest: RunningContest) {

    // Retrieve the exploding bomb.
    const bomb = await this.bombRepository.getOne(id);

    // Execute the explosion.
    this.bombExplosion.explode(bomb, contest);

    await this.destroyBomb(bomb, contest.battlefield);

    // TODO: Persist contest to save nested entities.
    // TODO: Send contest state via websockets.
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

    // TODO: Extract these base informations somewhere.
    bomb.blast = 3;
    bomb.countdown = 3000;

    return this.bombRepository.save(bomb);
  }

  /**
   * Destroy the given {@link Bomb}.
   * @param bomb
   * @param battlefield
   */
  private async destroyBomb(bomb: Bomb, battlefield: Battlefield) {

    battlefield.bombs = new Set(Array.from(battlefield.bombs).filter(b => b.id !== bomb.id));

    await this.battlefieldRepository.save(battlefield);
    await this.bombRepository.delete(bomb);
  }

  /**
   * Determines the position of the bomb based on the position of the {@link Player}.
   * @param {Direction} direction
   * @param {Player} player
   * @param {Battlefield} battlefield
   * @returns {Position}
   */
  private findBombPosition(direction: Direction, player: Player, battlefield: Battlefield): Position {

    const position = this.battlefieldService.findPosition(player, battlefield);
    const vector: Vector = directionToVector(direction);

    position.x += vector.x;
    position.y += vector.y;

    return position;
  }
}
