import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { RedisService } from '../redis/redis.service';

export type Trigger = Observable<void>;

@Injectable()
export class MutexService {

  /** Notifies when the mutex is freed. */
  private freed: Subject<void> = new Subject();

  constructor(private readonly redis: RedisService) {
    // Set initial lock.
    this.locker(false).subscribe();
  }

  /** Locks the mutex. */
  lock(): Trigger {
    const locker = this.locker(true);
    const freed = this.freed.pipe(
      switchMap(() => locker),
      take(1)
    );

    return this.isLocked().pipe(
      switchMap(l => l ? freed : locker)
    );
  }

  /** Unlocks the mutex. */
  unlock(): void {
    this.locker(false).subscribe(() => this.freed.next());
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
}
