import { Injectable } from '@nestjs/common';
import { Contest } from '../../../database/entity/contest.entity';

// Redis repository.
import { RunningContestRepository } from '../../../redis/services/repositories/running-contest-repository/running-contest.repository';
import { PlayerRepository } from '../../../redis/services/repositories/player-repository/player.repository';
import { BattlefieldRepository } from '../../../redis/services/repositories/battlefield-repository/battlefield.repository';

// Redis entities.
import { RunningContest } from 'src/redis/entities/running-contest.entity';
import { Player, Skin } from 'src/redis/entities/player.entity';
import { Battlefield } from '../../../redis/entities/battlefield.entity';

// Database entities.
import { Participant } from '../../../database/entity/participant.entity';
import { Map } from '../../../database/entity/map.entity';

@Injectable()
export class MigrateContestService {

  constructor(private readonly runningContestRepository: RunningContestRepository,
              private readonly playerRepository: PlayerRepository,
              private readonly battlefieldRepository: BattlefieldRepository) {}

  /**
   * Migrates the given contest.
   * @param contest 
   */
  async migrate(contest: Contest): Promise<RunningContest> {

    const runningContest = new RunningContest();

    // Prepare the players.
    runningContest.players = await this.convertParticipantsToPlayers(contest.participants);

    // Prepare the battlefield.
    runningContest.battlefield = await this.convertMapToBattlefield(contest.map);

    return this.runningContestRepository.save(runningContest);
  }

  /**
   * Converts the {@link Participant} to real {@link Player}.
   * @param participants
   */
  private async convertParticipantsToPlayers(participants: Participant[]): Promise<Set<Player>> {
    const players = new Set<Player>();

    // Initial players positions.
    const positions = [
      [25, 35],
      [170, 35]
    ];

    const skins = [
      Skin.Player1, Skin.Player2,
      Skin.Player3, Skin.Player4
    ];

    let i = 0;

    participants.forEach(async (participant) => {

      const player = new Player();

      player.confirmed = false;
      player.participantId = participant.id;

      player.hearts = 3;
      player.lives = 3;
      player.speed = 10;

      const [ x, y ] = positions[i];

      player.positionX = x;
      player.positionY = y;

      player.skin = skins[i];

      i ++;

      players.add(
        await this.playerRepository.save(player)
      );
    });

    return players;
  }

  /**
   * Converts the given {@link Map} to a {@link Battlefield}.
   * @param map
   */
  private async convertMapToBattlefield(map: Map): Promise<Battlefield> {

    const battlefield = new Battlefield();

    battlefield.height = map.width;
    battlefield.width = map.height;

    battlefield.matrixRepresentation = map.content;

    return this.battlefieldRepository.save(battlefield);
  }
}
