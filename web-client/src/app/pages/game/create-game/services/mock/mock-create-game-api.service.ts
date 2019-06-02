import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseMock } from '../../../../../web-service/super-class/base-mock';
import { CreateGameApi } from '../create-game-api';

// Models.
import { CreateGame } from '../../models/create-game.model';
import { CreateGameResponse } from '../../models/create-game-response.model';

@Injectable()
export class MockCreateGameApiService extends BaseMock implements CreateGameApi {

  /** @inheritdoc */
  create(payload: CreateGame): Observable<CreateGameResponse> {

    return of(undefined);
  }
}
