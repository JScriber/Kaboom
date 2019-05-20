import { Injectable } from '@angular/core';
import { BaseMock } from '../../../../web-service/super-class/base-mock';
import { UserApi } from '../user-api';
import { Observable, of } from 'rxjs';

// Models.
import { User } from '../../models/user.model';
import { ChangePassword } from '../../models/change-password.model';

@Injectable()
export class MockUserApiService extends BaseMock implements UserApi {

  /** @inheritdoc */
  informations(): Observable<User> {
    return of(undefined);
  }

  /** @inheritdoc */
  save(user: User): Observable<void> {

    return of();
  }

  /** @inheritdoc */
  changePassword(passwords: ChangePassword): Observable<void> {

    return of();
  }

  /** @inheritdoc */
  delete(password: string): Observable<void> {

    return of();
  }
}
