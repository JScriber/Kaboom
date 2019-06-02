import { Observable } from 'rxjs';

// Models.
import { SignIn } from './models/sign-in.model';
import { SignUp } from './models/sign-up.model';
import { Token } from './models/token.model';

export interface UserSignApi {

  /** Creates a new player. */
  signUp(dto: SignUp): Observable<Token>;

  /** Authentificate a player. */
  signIn(dto: SignIn): Observable<Token>;
}
