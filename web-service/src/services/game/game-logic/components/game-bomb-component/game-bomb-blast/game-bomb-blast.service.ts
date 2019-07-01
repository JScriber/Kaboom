import { Injectable } from '@nestjs/common';

// Entities.
import { Bomb } from '@redis-entity/bomb.entity';
import { RunningContest } from '@redis-entity/running-contest.entity';

// Services.
import { GamePlayerService } from '../../../../game-player/game-player.service';
import { GameBattlefieldService, Data } from '../../../../game-battlefield/game-battlefield.service';

// Models.
import { Position } from '../../../models/position.model';

enum Axis {
  X, Y
}

@Injectable()
export class GameBombBlastService {

  constructor(private readonly playerService: GamePlayerService,
              private readonly battlefieldService: GameBattlefieldService) {}

  /**
   * Makes the {@link Bomb} explode in the {@link RunningContest}.
   * @param {Bomb} bomb
   * @param {RunningContest} contest
   */
  explode(bomb: Bomb, contest: RunningContest) {
    const { battlefield } = contest;
    const players = Array.from(contest.players)

    // Store the positions of each player.
    const playerPositions: { [key: number]: Position } = players
      .reduce((previous, player) => ({
        ... previous,
        [player.id]: this.battlefieldService.findPosition(player, battlefield)
      }), {});

    // Deserialized battlefield map.
    const map = this.battlefieldService.deserialize(battlefield);

    // List of impacted players.
    let impactedPlayersID: number[] = [];

    // Position of the bomb.
    const position: Position = {
      x: bomb.positionX,
      y: bomb.positionY
    };

    /**
     * Checks the position.
     * @param {number} x
     * @param {number} y 
     */
    const checker = (x: number, y: number): boolean => {

      // Says if the blast must be stopped.
      let stopPropagation = false;

      // Check bounds.
      if (x >= 0 && y >= 0 && x < battlefield.width && y < battlefield.height) {
  
        // Find impacted players.
        impactedPlayersID = impactedPlayersID.concat(Object.keys(playerPositions)
        .map(id => Number.parseInt(id))
        .filter(id => {
          const position: Position = playerPositions[id];
  
          return position.x === x && position.y === y;
        }));
  
        // Check surrounding damages.
        const mapData: Data = map[x][y];
  
        // A fixed obstacle stops the propagation of the blast.
        if (mapData === Data.FixedObstacle) {
          stopPropagation = true;
        }
      }

      return stopPropagation;
    };

    this.checkAxis(position, Axis.X, bomb.blast, checker);
    this.checkAxis(position, Axis.Y, bomb.blast, checker);

    // Resolve the players.
    if (impactedPlayersID.length > 0) {

      const impactedPlayers = players.filter(p => impactedPlayersID.find(id => p.id === id));

      // Each player gets hurt.
      impactedPlayers.forEach(player => this.playerService.hurt(player));
    }
  }

  /**
   * Check the two sides of an axis.
   * @param {Position} basePosition - Initial position of the bomb.
   * @param {Axis} axis - Scanned axis.
   * @param {number} blast - Range of the blast.
   * @param {(x: number, y: number) => boolean} checker - Executor/Checker.
   */
  private checkAxis(basePosition: Position, axis: Axis, blast: number, checker: (x: number, y: number) => boolean) {

    const startPoint = axis === Axis.X ? basePosition.x : basePosition.y;

    const execute = (movingPoint: number): boolean => {

      const x = axis === Axis.X ? movingPoint : basePosition.x;
      const y = axis === Axis.Y ? movingPoint : basePosition.y;

      return checker(x, y);
    };

    // First side.
    for (let i = startPoint; i < startPoint + blast; i ++) {
      if (execute(i)) break;
    }

    // Second side.
    for (let i = startPoint; i > startPoint - blast; i --) {
      if (execute(i)) break;
    }
  }
}
