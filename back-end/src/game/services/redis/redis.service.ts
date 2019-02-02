import { Injectable, Logger } from '@nestjs/common';
import * as Redis from 'ioredis';

import { Observable, from, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import Game from '../../model/game';
import Player from '../../model/player';
import { keys } from './redis-keys';

@Injectable()
export class RedisService {

  /** Redis database. */
  private readonly redis = new Redis();

  /**
   * Returns the lock from redis.
   * @returns {Observable<boolean>}
   */
  getLock(): Observable<boolean> {
    return Observable.create(async obs => {
      const lock = (await this.redis.mget('game_test'))[0] === '1';

      obs.next(lock);
      obs.complete();
    });
  }

  /**
   * Sets the lock state.
   * @param {boolean} state
   * @returns {Observable<void>}
   */
  setLock(state: boolean): Observable<void> {
    return Observable.create(async obs => {
      console.log('LOCK -', state);
      await this.redis.mset('game_test', + state);

      obs.next();
      obs.complete();
    });
  }

  async pushGame() {
    const id: string = await this.generateID(keys.game.count, keys.game.list).toPromise();

    const player: Player = {
      id: 10,
      uuid: 'sqdfdsf',
      position: {
        x: 1,
        y: 1
      },
      items: []
    };

    const game: Game = {
      id: parseInt(id),
      range: {
        start: new Date(),
        end: new Date()
      },
      players: [player],
      owner: player,
      map: {
        dimensions: {
          width: 50,
          height: 50
        },
        slots: []
      },
      bonus: {
        wallPass: true,
        teleportation: true,
        fireSuit: true,
        bombUp: true,
        speedUp: true,
        yellowFlame: true,
        redFlame: true,
        bombDisarmer: true,
        powerGlove: true,
        push: true,
        heart: false,
        lifeUp: false,
        swapPositions: true
      },
      penalty: {
        bombDown: false,
        speedDown: false,
        blueFlame: false,
        invert: false
      }
    }
  
    this.redis.hmset(id,
      'start', new Date().toString(),
      'end', new Date().toString(),
      'json', JSON.stringify(game)
    );

    console.log(await this.redis.hmget(id, 'start', 'end'), +true);
    console.log(JSON.parse(await this.redis.hmget(id, 'json')));
  }

  setGameState(game: Game): Observable<Game> {
    return Observable.create(obs => {
      obs.next(game);
      obs.complete();
    })
  }
  
  /**
   * Finds the state of the game.
   * @param {number} id - ID of the game.
   * @returns {Observable<Game>}
   */
  getGameState(id: number): Observable<Game> {
    const player: Player = {
      id: 1,
      uuid: 'sqdfdsf',
      position: {
        x: 1,
        y: 1
      },
      items: []
    };

    return of({
      id,
      range: {
        start: new Date(),
        end: new Date()
      },
      players: [player],
      owner: player,
      map: {
        dimensions: {
          width: 50,
          height: 50
        },
        slots: []
      },
      bonus: {
        wallPass: true,
        teleportation: true,
        fireSuit: true,
        bombUp: true,
        speedUp: true,
        yellowFlame: true,
        redFlame: true,
        bombDisarmer: true,
        powerGlove: true,
        push: true,
        heart: false,
        lifeUp: false,
        swapPositions: true
      },
      penalty: {
        bombDown: false,
        speedDown: false,
        blueFlame: false,
        invert: false
      }
    });
  }

  /**
   * Generate an id with the given columns.
   * @param {string} key - Key column name.
   * @param {string} list - List column name.
   * @returns {Observable<string>}
   */
  private generateID(key: string, list: string): Observable<string> {
    const promise = this.redis.incr(key);

    return this.observablify<number>(promise).pipe(
      map(id => list + id)
    );
  }

  /**
   * Transforms promises into observables.
   * @template T - Returned type.
   * @param {Promise<any>} promise
   * @returns {Observable<T>}
   */
  private observablify<T>(promise: Promise<any>): Observable<T> {
    return from(promise).pipe(take(1));
  }
}
