import { Injectable, Logger } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import * as Redis from 'ioredis';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import Game from '../../model/game';
import Player from '../../model/player';
import { keys } from './redis-keys';

@Injectable()
export class SerializerService {

  /** Redis database. */
  private readonly redis = new Redis();

  /**
   * Serialize the command.
   * @param {ICommand} command
   */
  serialize(command: ICommand): void {
    // TODO: handle groups.

    this.generateID(keys.command.count, keys.command.list)
      .subscribe(id => {
        this.redis.hset(id, 'serial', JSON.stringify(command))
          .catch(err => {
            Logger.error('Error while serializing the command.', err, 'Redis');
          });
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

  /**
   * Generate an id with the given columns.
   * @param {string} key - Key column name.
   * @param {string} list - List column name.
   * @returns {Observable<string>}
   */
  private generateID(key: string, list: string): Observable<string> {
    const promise = this.redis.incr(key);

    return from(promise).pipe(
      take(1),
      map(id => list + id)
    );
  }
}
