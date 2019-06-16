import { User } from '@entity/user.entity';
import { ContestForm, ContestIndex, ContestAccess, ContestJoin } from '@model/contest';
import { Contest } from '@entity/contest.entity';

export interface IContestService {

  /**
   * Creates a new {@link Contest} where the {@link User} is the creator.
   * @param {User} user 
   * @param {ContestForm} parameters
   * @returns access to contest.
   * @throws NotFoundException
   */
  create(user: User, parameters: ContestForm): Promise<ContestJoin>;

  /**
   * The given {@link User} Joins the contest which has the uuid.
   * @param {string} uuid
   * @param {User} user
   * @returns access to contest.
   */
  join(uuid: string, user: User): Promise<ContestAccess>;

  /**
   * Gets all the opened contest.
   * @returns list of {@link ContestIndex}.
   */
  list(): Promise<ContestIndex[]>;

  /**
   * Says if the {@link Contest} is ready for launch.
   * @param contest
   * @returns TRUE or FALSE.
   */
  isReady(contest: Contest): boolean;


  /**
   * Starts the {@link Contest}.
   * @param contest 
   */
  start(contest: Contest): void;
}
