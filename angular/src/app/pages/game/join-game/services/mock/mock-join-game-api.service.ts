import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { BaseMock } from '../../../../../web-service/super-class/base-mock';
import { JoinGame } from '../join-game-api';
import { Preview } from '../../models/preview.model';

@Injectable()
export class MockJoinGameApiService extends BaseMock implements JoinGame {

  /** @inheritdoc */
  getPreviews(): Observable<Preview[]> {

    return of([]);
  }

  /** @inheritdoc */
  access(id: number): Observable<string> {

    return of(undefined);
  }
}
