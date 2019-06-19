import { Contest } from '@entity/contest.entity';

/**
 * Information on the slots of a {@link Contest}.
 */
export interface ContestSlot {
  /** Used slots. */
  taken: number;

  /** Total number of slots. */
  total: number;
}

/**
 * Informations on the {@link Contest} waiting.
 */
export class ContestWait {

  /** ID of the field. */
  field: number;

  /** Slots. */
  slots: ContestSlot;

  /** Optional time limit. */
  duration: number | undefined;

  /** Says if the bonus are activated. */
  bonusActivated: boolean;

  /** Says if the penalties are activated. */
  penaltiesActivated: boolean;

  constructor(contest: Contest) {
    this.field = contest.map.id;
    
    this.slots = {
      taken: contest.participants.length,
      total: contest.maxParticipants
    };
    
    this.duration = contest.duration;

    this.bonusActivated = Object.keys(contest.bonus).some(k => k !== 'id' && contest.bonus[k]);
    this.penaltiesActivated = Object.keys(contest.penalties).some(k => k !== 'id' && contest.penalties[k]);
  }
}
