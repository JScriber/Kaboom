import { Injectable } from '@angular/core';
import { BaseMock } from '../../super-class/base-mock';
import { UserSignApi } from '../user-sign-api';

// Models.
import { SignUp } from '../models/sign-up.model';
import { SignIn } from '../models/sign-in.model';
import { Observable, of } from 'rxjs';
import { SignedIn } from '../models/signed-in.model';

@Injectable()
export class MockUserSignApiService extends BaseMock implements UserSignApi {

  /** @inheritdoc */
  signUp(dto: SignUp): Observable<void> {
    return of();
  }

  /** @inheritdoc */
  signIn(dto: SignIn): Observable<SignedIn> {
    return of(undefined);
  }
}
