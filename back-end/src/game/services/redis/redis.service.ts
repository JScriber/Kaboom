import { Injectable } from '@nestjs/common';
import { Observable, from, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as Redis from 'ioredis';

import Game from '../../model/game';
import { Locker } from './locker/locker';

/** Game key in database. */
const GAME_KEY = 'game';

/** Game key count. */
const GAME_KEY_COUNT = GAME_KEY + ':count';

@Injectable()
export class RedisService {

  /** Redis database. */
  private readonly redis = new Redis();

  /** Resource locker. */
  private readonly locker = new Locker(this.redis, GAME_KEY);

  /**
   * Access the game state.
   * @param {number} id
   * @returns {Observable<Game>}
   */
  accessMutable(id: number): Observable<Game> {
    return this.locker.lock(id).pipe(
      switchMap(() => this.access(id))
    );
  }

  /**
   * Access the game state in read-only.
   * @param {number} id
   * @returns {Observable<Game>}
   */
  access(id: number): Observable<Game> {
    return Observable.create(async (obs: Subscriber<Game>) => {
      const key = this.key(id);
      const json: string = (await this.redis.mget(key))[0];

      if (json) {
        try {
          const game: Game = JSON.parse(json);

          obs.next(game);
          obs.complete();
        } catch (e) {
          obs.error();
        }
      } else {
        obs.error();
      }
    });
  }

  /**
   * Saves the game state.
   * @param {Lock} lock
   * @param {Game} game
   * @returns {Observable<void>}
   */
  save(game: Game): Observable<void> {
    if (game) {
      const key = this.key(game.id);
  
      this.redis.set(key, JSON.stringify(game));

      // Free the resource.
      return from(this.locker.unlock(game.id));
    }
  }

  /**
   * Inits a game state.
   * @param {Game} game
   * @returns {Promise<string>}
   */
  async init(game: Game): Promise<string> {
    let id = +(await this.generateID(GAME_KEY_COUNT));
    
    // TODO: Remove.
    id = 1;

    const key = this.key(id);

    // Register the resource.
    this.locker.register(id);

    // Set the generated id.
    game.id = id;

    // TODO: Handle error.
    return this.redis.set(key, JSON.stringify(game));
  }

  /**
   * Returns the key of the game.
   * @param {number} id
   * @returns {string}
   */
  private key(id: number): string {
    return `${GAME_KEY}:${id}`;
  }

  /**
   * Generate an id with the given columns.
   * @param {string} key - Key column name.
   * @returns {Observable<number>}
   */
  private async generateID(key: string): Promise<number> {
    return this.redis.incr(key);
  }
}
