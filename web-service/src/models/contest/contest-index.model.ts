import { Contest } from '@entity/contest.entity';
import { ContestSlot } from './contest-wait.model';

/**
 * Minified representation of a {@link Contest}.
 */
export class ContestIndex {

  /** UUID of the game. */
  uuid: string;

  /** ID of the field. */
  field: number;

  /** Optionnal time limit. */
  duration: number | undefined;

  /** Slots. */
  slots: ContestSlot;

  constructor(contest: Contest) {
    this.uuid = contest.uuid;
    this.field = contest.map.id;
    this.duration = contest.duration;
    
    this.slots = {
      taken: contest.participants.length,
      total: contest.maxParticipants
    };
  }
}
