import { User } from '@entity/user/user.entity';
import { ContestForm, ContestIndex } from '@model/contest';

export interface IContestService {

  /**
   * Creates a new {@link Contest} where the {@link User} is the creator.
   * @param {User} user 
   * @param {ContestForm} parameters
   * @returns access token.
   * @throws NotFoundException
   */
  create(user: User, parameters: ContestForm): Promise<string>;

  /**
   * The given {@link User} Joins the contest which has the uuid.
   * @param {string} uuid
   * @param {User} user
   * @returns access token.
   */
  join(uuid: string, user: User): Promise<string>;

  /**
   * Gets all the opened contest.
   * @returns list of {@link ContestIndex}.
   */
  list(): Promise<ContestIndex[]>;
}
