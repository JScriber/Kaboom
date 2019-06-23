import { Injectable } from '@nestjs/common';

// Entities.
import { RunningContest } from 'src/redis/entities/running-contest.entity';
import { Player } from '../../../redis/entities/player.entity';

// Services.
import { TokenService } from '../../token/token.service';
import { RunningContestRepository } from '../../../redis/services/repositories/running-contest-repository/running-contest.repository';
import { PlayerRepository } from '../../../redis/services/repositories/player-repository/player.repository';

/**
 * A data access has current {@link RunningContest} state.
 * And the current {@link Player} who executes the action.
 */
export type DataAccess = [RunningContest, Player];

/** Payload of the running contest token. */
export interface RunningContestToken {
  runningContestId: number;
  playerId: number;
}

/**
 * Service to create and read the token of a {@link RunningContest}.
 */
@Injectable()
export class GameTokenService {

  constructor(private readonly tokenService: TokenService,
              private readonly repository: RunningContestRepository,
              private readonly playerRepository: PlayerRepository) {}

  /**
   * Generates a token to access the running contest.
   * @param runningContest
   * @param player
   * @returns {string} token.
   */
  createToken({ id }: RunningContest, player: Player): string {

    return this.tokenService.generateFrom<RunningContestToken>({
      runningContestId: id,
      playerId: player.id
    });
  }

  /**
   * Extracts the {@link Player} informations from the token.
   * @param {string} token
   * @returns the player.
   */
  async extractPlayerFromToken(token: string): Promise<Player | undefined> {
    const { playerId }: RunningContestToken = this.tokenService.extractFrom(token);
    let player: Player | undefined;

    if (playerId !== undefined) {
      player = await this.playerRepository.getOne(playerId);
    }

    return player;
  }

  /**
   * Extracts informations on the player with the token.
   * @param {string} token
   */
  async extractFromToken(token: string): Promise<DataAccess | undefined> {
    let contest: RunningContest, player: Player;

    const { playerId, runningContestId }: RunningContestToken = this.tokenService.extractFrom(token);

    if (playerId !== undefined && runningContestId !== undefined) {
      contest = await this.repository.getOne(runningContestId);

      player = Array.from(contest.players).find(p => p.id === playerId);
    }

    if (!contest || !player) return undefined;

    return [contest, player];
  }
}
