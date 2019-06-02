import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../super-class/base-api';
import { UserSignApi } from '../user-sign-api';

// Models.
import { SignUp } from '../models/sign-up.model';
import { SignIn } from '../models/sign-in.model';
import { Token } from '../models/token.model';

@Injectable()
export class UserSignApiService extends BaseApi implements UserSignApi {

  /** @inheritdoc */
  protected baseUrl = 'user';

  /** @inheritdoc */
  signUp(dto: SignUp): Observable<Token> {
    return this.deserialize(this.postRequest('/', dto), Token);
  }

  /** @inheritdoc */
  signIn(dto: SignIn): Observable<Token> {
    return this.deserialize(this.postRequest('/login', dto), Token);
  }
}
