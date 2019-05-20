import { Observable } from 'rxjs';

// Models.
import { SignIn } from './models/sign-in.model';
import { SignUp } from './models/sign-up.model';
import { SignedIn } from './models/signed-in.model';

export interface UserSignApi {

  /** Creates a new player. */
  signUp(dto: SignUp): Observable<void>;

  /** Authentificate a player. */
  signIn(dto: SignIn): Observable<SignedIn>;
}
