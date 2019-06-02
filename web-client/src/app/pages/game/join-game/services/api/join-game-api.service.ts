import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { JoinGame } from '../join-game-api';
import { BaseApi } from '../../../../../web-service/super-class/base-api';
import { Preview } from '../../models/preview.model';

@Injectable()
export class JoinGameApiService extends BaseApi implements JoinGame {

  /** @inheritdoc */
  protected baseUrl = '/join-game';

  /** @inheritdoc */
  getPreviews(): Observable<Preview[]> {

    // TODO: Change.
    const preview = new Preview();
    preview.id = 0;
    preview.field = 0;
    preview.emptySlots = 2;
    preview.totalSlots = 4;
    preview.timeLimit = 10;

    return of([ preview ]);
  }

  /** @inheritdoc */
  access(id: number): Observable<string> {

    return of('some-uuid');
  }
}
