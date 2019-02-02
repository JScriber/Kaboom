import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

type NotifierMap = { [key: number]: Subject<void> };

@Injectable()
export class MutexNotifierService {

  /** Map of notifiers. */
  private readonly notifiers: NotifierMap = {};

  /**
   * Creates a new notifier.
   * @param {number} id
   */
  create(id: number): void {
    if (!this.exist(id)) {
      this.notifiers[id] = new Subject();
    }
  }

  /**
   * Drops a notifier.
   * @param {number} id
   */
  drop(id: number): void {
    if (this.exist(id)) {
      this.notifiers[id].complete();
      delete this.notifiers[id];
    }
  }

  /**
   * Asks for listening to a notifier.
   * @param {number} id
   * @returns {Subject<void> | null}
   */
  listen(id: number): Subject<void> | null {
    return this.exist(id) ? this.notifiers[id] : null;
  }

  /**
   * Says if the the given id already exists.
   * @param {number} id
   * @returns {boolean}
   */
  private exist(id: number): boolean {
    return this.notifiers[id] !== undefined;
  }
}
