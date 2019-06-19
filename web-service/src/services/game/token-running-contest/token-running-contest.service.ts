import { Injectable } from '@nestjs/common';

// Entities.
import { RunningContest } from 'src/redis/entities/running-contest.entity';
import { Player } from '../../../redis/entities/player.entity';

// Services.
import { TokenService } from '../../token/token.service';

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

  constructor(private readonly tokenService: TokenService) {}

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
}
