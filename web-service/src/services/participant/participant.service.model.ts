import { Participant } from "@entity/participant.entity";

// Entities.
import { User } from '@entity/user.entity';
import { Contest } from '@entity/contest.entity';

export interface IParticipantService {

  /**
   * Creates a participation in the given {@link Contest}
   * @param user - who participates.
   * @param contest
   * @returns a new {@link Participant}
   */
  create(user: User, contest: Contest): Promise<Participant>;

  /**
   * Sets the {@link Participant} as connected.
   * @param participant
   */
  connect(participant: Participant): void;

  /**
   * Sets the {@link Participant} as disconnected.
   * @param participant
   */
  disconnect(participant: Participant): void;

  /**
   * Generates a token for the {@link Participant}
   * @param participant
   * @returns an access token.
   */
  getToken(participant: Participant): string;

  /**
   * Finds a {@link Participant} from his token.
   * @param token
   * @returns a {@link Participant}
   */
  getFromToken(token: string): Promise<Participant>;
}
