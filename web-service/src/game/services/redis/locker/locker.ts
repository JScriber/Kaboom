import { Redis } from 'ioredis';
import { Observable, Subscriber } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Notifier } from './notifier';

export class Locker {

  /** Notifiers manager. */
  private readonly notifier = new Notifier();

  constructor(private readonly client: Redis,
              private readonly keyPrefix: string) {}

  /**
   * Locks the given resource.
   * @param {string | number} id
   * @param {number} ttl
   */
  lock(id: string | number): Observable<void> {
    // Check if the resource has been registered.
    if (this.notifier.exist(id)) {
      const getLock = this.locker(id);
      const waitLock = this.notifier.get(id).pipe(
        switchMap(() => getLock),
        take(1)
      );
  
      return this.hasLocker(id).pipe(
        // Wait or directly get the lock.
        switchMap(locked => {
          console.log(locked ? 'Resource is in use' : 'Lock the resource');
          return locked ? waitLock : getLock;
        })
      );
    } else {
      console.log('Game not registered');
    }
    // TODO: Handle not existing resource.
  }

  /**
   * All resources to lock need to be registered.
   * @param {string | number} resource - Resource ID.
   */
  register(resource: string | number): void {
    this.notifier.create(resource);
  }

  /**
   * Unlocks the resource.
   * @param {string | number} id
   * @returns {Promise<void>}
   */
  async unlock(id: string | number): Promise<void> {
    const key = this.key(id);

    console.log('Unlock', key);

    await this.client.del(key);

    this.notifier.get(id).next();
  }

  /**
   * Creates the lock in the database.
   * @param id 
   */
  private locker(id: string | number): Observable<void> {
    const key = this.key(id);

    return Observable.create(async (subscriber: Subscriber<void>) => {
      await this.client.set(key, 1);

      subscriber.next();
      subscriber.complete();
    });
  }

  /** 
   * Says if the resource is locked
   * @param {string | number} id
   * @returns {Observable<boolean>}
   */
  private hasLocker(id: string | number): Observable<boolean> {
    const key = this.key(id);

    return Observable.create(async (subscriber: Subscriber<boolean>) => {
      const exist = (await this.client.exists(key)) === 1;

      subscriber.next(exist);
      subscriber.complete();
    });
  }

  /**
   * Returns the key of the locker.
   * @param {string | number} id
   * @returns {string}
   */
  private key(id: string | number): string {
    return `${this.keyPrefix}:locked:${id}`;
  }
}
