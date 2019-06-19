import { Observable } from 'rxjs';

// Models.
import { ContestForm } from '../../models/create-contest/contest-form.model';
import { ContestIndex } from '../../models/join-contest/contest-index.model';
import { ContestJoin } from '../../models/join-contest/contest-join.model';
import { ContestAccess } from '../../models/contest-access.model';

/**
 * Typing interface for the {@link ContestApiService}.
 * Allow contest manipulation.
 */
export interface ContestApi {

  /**
   * Creates a new contest with the given settings.
   * @param contest
   * @returns {Observable<ContestJoin>} - Data to join the contest.
   */
  create(contest: ContestForm): Observable<ContestJoin>;

  /**
   * Joins the given contest.
   * @param contest
   * @returns {Observable<ContestAccess>} - Access to the contest.
   */
  join(contest: ContestJoin): Observable<ContestAccess>;

  /**
   * Returns a list of all the available contests.
   * @returns {Observable<ContestIndex[]>}
   */
  list(): Observable<ContestIndex[]>;
}
