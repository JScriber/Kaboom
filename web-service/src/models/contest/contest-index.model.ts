import { Contest } from '@entity/contest.entity';

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

  /** Empty slots. */
  emptySlots: number;

  /** Total number of slots. */
  totalSlots: number;

  constructor(contest: Contest) {
    this.uuid = contest.uuid;
    this.field = contest.map.id;
    this.duration = contest.duration;
    this.totalSlots = contest.maxParticipants;
    this.emptySlots = contest.maxParticipants - contest.participants.length;
  }
}
