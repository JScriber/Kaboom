import { Player } from '@redis-entity/player.entity';
import { RunningContest } from '@redis-entity/running-contest.entity';

/**
 * Interface for components (deported logic).
 */
export interface ILogicComponent<D> {

  /**
   * Executes the underlying logic.
   */
  execute(player: Player, contest: RunningContest, data: D): Promise<RunningContest>;
}
