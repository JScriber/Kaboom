import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseMock } from '../../super-class/base-mock';
import { UserSignApi } from '../user-sign-api';

// Models.
import { SignUp } from '../models/sign-up.model';
import { SignIn } from '../models/sign-in.model';
import { Token } from '../models/token.model';

@Injectable()
export class MockUserSignApiService extends BaseMock implements UserSignApi {

  /** @inheritdoc */
  signUp(dto: SignUp): Observable<Token> {
    return of();
  }

  /** @inheritdoc */
  signIn(dto: SignIn): Observable<Token> {
    return of(undefined);
  }
}
