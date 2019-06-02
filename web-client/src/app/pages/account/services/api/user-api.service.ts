import { Injectable } from '@angular/core';
import { BaseApi } from '../../../../web-service/super-class/base-api';
import { UserApi } from '../user-api';
import { Observable } from 'rxjs';

// Models.
import { User } from '../../models/user.model';
import { ChangePassword } from '../../models/change-password.model';

@Injectable()
export class UserApiService extends BaseApi implements UserApi {

  /** @inheritdoc */
  protected baseUrl = 'user/@me';

  /** @inheritdoc */
  informations(): Observable<User> {
    return this.deserialize(this.getRequest(), User);
  }

  /** @inheritdoc */
  save(user: User): Observable<void> {
    return this.putRequest('/', this.jsonConverter.serialize(user));
  }

  /** @inheritdoc */
  changePassword(passwords: ChangePassword): Observable<void> {
    return this.putRequest('/password', this.jsonConverter.serialize(passwords));
  }

  /** @inheritdoc */
  delete(password: string): Observable<void> {
    return this.postRequest('/delete', { password });
  }
}
