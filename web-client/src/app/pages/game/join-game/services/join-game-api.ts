import { Observable } from 'rxjs';
import { Preview } from '../models/preview.model';

export interface JoinGame {

  /** 
   * Returns the previews of all the available games.
   * @returns {Observable<Preview[]>}
   */
  getPreviews(): Observable<Preview[]>;

  /**
   * Access the given game.
   * @param {number} id - Game ID.
   * @returns {Observable<string>}
   */
  access(id: number): Observable<string>;
}
