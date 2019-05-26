import { Observable } from 'rxjs';

// Models.
import { CreateGame } from '../models/create-game.model';
import { CreateGameResponse } from '../models/create-game-response.model';

export interface CreateGameApi {

  /** Creates the game. */
  create(payload: CreateGame): Observable<CreateGameResponse>;
}
