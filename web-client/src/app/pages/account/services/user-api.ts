import { Observable } from 'rxjs';

// Models.
import { User } from '../models/user.model';
import { ChangePassword } from '../models/change-password.model';

export interface UserApi {

  /** Get informations of the authentificated user. */
  informations(): Observable<User>;

  /** Saves the user. */
  save(user: User): Observable<void>;

  /** Changes the password of the user. */
  changePassword(passwords: ChangePassword): Observable<void>;

  /** Deletes the authentificated user. */
  delete(password: string): Observable<void>;
}
