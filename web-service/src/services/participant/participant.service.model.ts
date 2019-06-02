import { Participant } from "@entity/participant/participant.entity";

// Entities.
import { User } from '@entity/user/user.entity';
import { Contest } from '@entity/contest/contest.entity';

export interface IParticipantService {

  /**
   * Creates a participation in the given {@link Contest}
   * @param user - who participates.
   * @param contest
   * @returns a new {@link Participant}
   */
  create(user: User, contest: Contest): Promise<Participant>;
}
