import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../../../web-service/super-class/base-api';
import { ContestApi } from '../contest-api';

// Models.
import { ContestForm } from '../../../models/create-contest/contest-form.model';
import { ContestIndex } from '../../../models/join-contest/contest-index.model';
import { ContestJoin } from '../../../models/join-contest/contest-join.model';
import { ContestAccess } from '../../../models/contest-access.model';

@Injectable()
export class ContestApiService extends BaseApi implements ContestApi {

  /** @inheritdoc */
  protected baseUrl = 'contest';

  /** @inheritdoc */
  create(contest: ContestForm): Observable<ContestJoin> {

    return this.deserialize(
      this.postRequest('/create', this.jsonConverter.serialize(contest)),
      ContestJoin
    );
  }

  /** @inheritdoc */
  join(contest: ContestJoin): Observable<ContestAccess> {

    return this.deserialize(
      this.postRequest('/join', this.jsonConverter.serialize(contest)),
      ContestAccess
    );
  }

  /** @inheritdoc */
  list(): Observable<ContestIndex[]> {

    return this.deserializeArray(this.getRequest('/'), ContestIndex);
  }
}
