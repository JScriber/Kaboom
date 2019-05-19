import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../super-class/base-api';
import { UserSignApi } from '../user-sign-api';

// Models.
import { SignUp } from '../models/sign-up.model';
import { SignIn } from '../models/sign-in.model';
import { SignedIn } from '../models/signed-in.model';

@Injectable()
export class UserSignApiService extends BaseApi implements UserSignApi {

  /** @inheritdoc */
  protected baseUrl = 'player';

  /** @inheritdoc */
  signUp(dto: SignUp): Observable<void> {
    return this.postRequest('/', dto);
  }

  /** @inheritdoc */
  signIn(dto: SignIn): Observable<SignedIn> {
    return this.deserialize(this.postRequest('/login', dto), SignedIn);
  }
}
