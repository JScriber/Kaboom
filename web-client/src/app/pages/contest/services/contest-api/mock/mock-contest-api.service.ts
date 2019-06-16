import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseMock } from '../../../../../web-service/super-class/base-mock';
import { ContestApi } from '../contest-api';

// Models.
import { ContestForm } from '../../../models/create-contest/contest-form.model';
import { ContestIndex } from '../../../models/join-contest/contest-index.model';
import { ContestJoin } from '../../../models/join-contest/contest-join.model';
import { ContestAccess } from '../../../models/contest-access.model';

@Injectable()
export class MockContestApiService extends BaseMock implements ContestApi {

  /** @inheritdoc */
  create(contest: ContestForm): Observable<ContestJoin> {

    return of();
  }

  /** @inheritdoc */
  join(contest: ContestJoin): Observable<ContestAccess> {
    
    return of();
  }

  /** @inheritdoc */
  list(): Observable<ContestIndex[]> {

    return of([]);
  }
}
