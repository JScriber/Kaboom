import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseApi } from '../../../../../web-service/super-class/base-api';
import { CreateGameApi } from '../create-game-api';

// Models.
import { CreateGame } from '../../models/create-game.model';
import { CreateGameResponse } from '../../models/create-game-response.model';

@Injectable()
export class CreateGameApiService extends BaseApi implements CreateGameApi {

  /** @inheritdoc */
  protected baseUrl = '/';

  /** @inheritdoc */
  create(payload: CreateGame): Observable<CreateGameResponse> {

    console.log(payload);

    return of(undefined);
  }
}
