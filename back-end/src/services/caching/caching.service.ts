import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import Game from '../../model/game';
import Player from '../../model/player';

const keys = {
  game: {
    list: 'game_list',
    count: 'game_count'
  }
};

@Injectable()
export class CachingService {
  private redis = new Redis();

  async pushGame() {
    const id: string = await this.gameID().toPromise();

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
   * Returns the game id.
   * @returns {Observable<string>}
   */
  private gameID(): Observable<string> {
    return from(this.redis.incr(keys.game.count))
      .pipe(map(id => this.idBuilder(id)));
  }

  private idBuilder(id: number): string {
    return keys.game.list + id;
  }
}
