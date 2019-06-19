import { Injectable } from '@nestjs/common';

// Entities.
import { RunningContest } from 'src/redis/entities/running-contest.entity';
import { Player } from '../../../redis/entities/player.entity';

// Services.
import { TokenService } from '../../token/token.service';
import { RunningContestRepository } from '../../../redis/services/repositories/running-contest-repository/running-contest.repository';

/** Payload of the running contest token. */
export interface RunningContestToken {
  runningContestId: number;
  playerId: number;
}

/**
 * Service to create and read the token of a {@link RunningContest}.
 */
@Injectable()
export class TokenRunningContestService {

  constructor(private readonly tokenService: TokenService,
              private readonly repository: RunningContestRepository) {}

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
   * Extracts informations on the player with the token.
   * @param {string} token
   * @throws Exception.
   */
  async extractFromToken(token: string): Promise<[RunningContest, Player]> {
    let contest: RunningContest, player: Player;

    const { playerId, runningContestId }: RunningContestToken = this.tokenService.extractFrom(token);

    if (playerId !== undefined && runningContestId !== undefined) {
      contest = await this.repository.getOne(runningContestId);

      player = Array.from(contest.players).find(p => p.id === playerId);
    }

    if (!contest || !player) throw new Error('Invalid token.');

    return [contest, player];
  }
}
