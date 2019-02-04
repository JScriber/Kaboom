import { Injectable } from '@nestjs/common';
import { Observable, from, Subscriber } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import * as Redis from 'ioredis';
import * as Redlock from 'redlock';

import Game from '../../model/game';

/** Game key in database. */
const GAME_KEY = 'game';

/** Game key count. */
const GAME_KEY_COUNT = GAME_KEY + ':count';

@Injectable()
export class RedisService {

  /** Redis database. */
  private readonly redis = new Redis();

  /** Resource locker. */
  private readonly redlock = new Redlock([ this.redis ], {
    driftFactor: 0.01,
    retryCount: 1,
    retryDelay: 50,
    retryJitter: 200
  });

  /** Maximum time the resource is locked (milliseconds). */
  private readonly ttl: number = 100;

  /**
   * Access the game state.
   * @param {number} id
   * @returns {Observable<[Redlock.Lock, Game]>}
   */
  accessMutable(id: number): Observable<[Redlock.Lock, Game]> {
    return this.locker(id).pipe(
      withLatestFrom(this.access(id))
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
   * @param {Redlock.Lock} lock
   * @param {Game} game
   * @returns {Observable<void>}
   */
  save(lock: Redlock.Lock, game: Game): Observable<void> {
    if (game) {
      const key = this.key(game.id);
  
      this.redis.set(key, JSON.stringify(game));
    }

    // Unlock the resource.
    return from(lock.unlock());
  }

  /**
   * Inits a game state.
   * @param {Game} game
   * @returns {Promise<string>}
   */
  async init(game: Game): Promise<string> {
    const id = +(await this.generateID(GAME_KEY_COUNT));
    const key = this.key(id);

    // Set the generated id.
    game.id = id;

    return this.redis.set(key, JSON.stringify(game));
  }

  /**
   * Locks a game state resource.
   * @param {number} id
   * @returns {Observable<Redlock.Lock>}
   */
  private locker(id: number): Observable<Redlock.Lock> {
    return Observable.create(async sub => {
      try {
        const lock = await this.redlock.lock(this.key(id), this.ttl);
        console.log('LOCK', lock);
        sub.next(lock);
        sub.complete();
      } catch (e) {
        console.log(e);
        sub.error(e);
      }
    });
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
