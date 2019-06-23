import { Injectable } from '@nestjs/common';
import { Observable, from, iif, of } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';

// Entities.
import { Player } from '../../../redis/entities/player.entity';
import { RunningContest } from '../../../redis/entities/running-contest.entity';

// Services.
import { GameTokenService } from '../game-token/game-token.service';
import { RunningContestRepository } from '../../../redis/services/repositories/running-contest-repository/running-contest.repository';

/**
 * Methods which contains some logic.
 * @template D - DTO type.
 */
export type LogicHandler<D> = (p: Player, g: RunningContest, d: D) => RunningContest | Promise<RunningContest> | Observable<RunningContest>;

/**
 * Generic logic executor.
 */
@Injectable()
export class GameExecutorService {

  constructor(private readonly token: GameTokenService,
              private readonly repository: RunningContestRepository) {}

  /**
   * Executes the logic.
   * @template D - Additional data type.
   * @param logic - Logic to execute.
   * @param additional - Additional data.
   * @param token - Token used to find the contest and the player.
   * @returns {Observable<RunningContest>}
   */
  execute<D>(logic: LogicHandler<D>, additional: D, token: string): Observable<RunningContest> {

    // TODO: Implement locker.

    return from(this.token.extractFromToken(token)).pipe(
      mergeMap(([ contest, player ]) => {
        const response = logic(player, contest, additional);

        // Support synchronous and asynchronous logic handlers.
        return iif(() => response instanceof Observable || response instanceof Promise,
          response as Promise<RunningContest>,
          of(response as RunningContest)
        );
      }),
      switchMap(contest => this.save(contest))
    );
  }

  /**
   * Saves the state of the given {@link RunningContest}.
   * @param {RunningContest} contest
   * @returns {Observable<RunningContest>}
   */
  private save(contest: RunningContest): Observable<RunningContest> {
    return from(this.repository.save(contest));
  }
}
