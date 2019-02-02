import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { RedisService } from '../redis/redis.service';
import { MutexNotifierService } from '../mutex-notifier/mutex-notifier.service';

export type Trigger = Observable<void>;

@Injectable()
export class MutexService {

  constructor(private readonly redis: RedisService,
              private readonly registry: MutexNotifierService) {
    // Set initial lock.
    this.locker(false).subscribe();
  }

  /** Locks the mutex. */
  lock(id: number): Trigger {
    const locker = this.locker(true);
    const freed = this.notifier(id).pipe(
      switchMap(() => locker),
      take(1)
    );

    return this.isLocked().pipe(
      switchMap(l => l ? freed : locker)
    );
  }

  /** Unlocks the mutex. */
  unlock(id: number): void {
    this.locker(false).subscribe(() => this.notifier(id).next());
  }

  /** Says if the mutex is locked. */
  private isLocked(): Observable<boolean> {
    return this.redis.getLock();
  }

  /**
   * Locks the locker.
   * @param {boolean} state
   * @returns {Trigger}
   */
  private locker(state: boolean): Trigger {
    return this.redis.setLock(state);
  }

  /**
   * Finds the corresponding notifier.
   * @param {number} id
   * @returns {Subject<void>}
   */
  private notifier(id: number): Subject<void> {
    return this.registry.listen(id);
  }
}
