import * as Redis from 'ioredis';
import { from, throwError, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';


import { RedisEntity } from './redis-base-dao.model';

/**
 * Grants access to redis keys.
 */
class RedisAccessors {

  private static _instance: RedisAccessors;

  static get instance() {
    if (!RedisAccessors._instance) RedisAccessors._instance = new this();
    
    return RedisAccessors._instance;
  }

  private constructor() {}

  /**
   * Access an id inside an entity.
   * @param {number} id
   */
  getId(table: string, id: number) {
    return `${table}:${id}`;
  }

  getIdCount(table: string) {
    return `${table}:count`;
  }
}

export abstract class RedisDAO<T extends RedisEntity> {

  /** Unique redis connection. */
  private static readonly REDIS = new Redis();

  /** Redis accessors. */
  protected static readonly ACCESSORS = RedisAccessors.instance;

  /** Entity table name. */
  protected abstract tableName: string;

  protected abstract classType: ClassType<T>;

  /**
   * Gets one element.
   * @param {number} id
   * @returns {Observable<T>}
   */
  getOne(id: number): Observable<T> {

    const idKey = RedisDAO.ACCESSORS.getId(this.tableName, id);

    return from(RedisDAO.REDIS.hgetall(idKey))
      .pipe(
        map((d: object) => {
          if (Object.keys(d).length === 0) {
            throw new Error(`Entity with id ${id} doesn't exist.`);
          }

          const deserialized: T = plainToClass(this.classType, d, {
            strategy: 'excludeAll',    
          });

          deserialized.id = id;

          return deserialized;
        })
      );
  }

  /**
   * Saves the entity.
   * @param {T} entity
   * @returns {Observable<T>}
   */
  save(entity: T): Observable<T> {

    return this.findID(entity).pipe(
      switchMap(id => from(
        RedisDAO.REDIS.hmset(RedisDAO.ACCESSORS.getId(this.tableName, id), classToPlain(entity))
      ).pipe(
        map(r => r === 1),
        switchMap(success => {
          if (!success) throwError('Failed to save the entity.');

          return this.getOne(id);
        })
      ))
    );
  }

  /**
   * Finds which ID to use for the entity.
   * @param {RedisEntity} entity
   * @returns {Observable<number>}
   */
  private findID(entity: RedisEntity): Observable<number> {
    const key = RedisDAO.ACCESSORS.getIdCount(this.tableName);

    return entity.id ? of(entity.id)
      : from(RedisDAO.REDIS.incr(key)).pipe(map(d => +d));
  }
}
