import { Subject } from 'rxjs';

/** Map of notifiers. */
type NotifierMap = { [key: string]: Subject<void> };

export class Notifier {

  /** Map of notifiers. */
  private readonly notifiers: NotifierMap = {};

  /**
   * Creates a new notifier.
   * @param {number} id
   */
  create(id: number | string): void {
    console.log('Create resource with ID', id);

    if (!this.exist(id)) {
      this.notifiers[id] = new Subject();
    }
  }

  /**
   * Asks for listening to a notifier.
   * @param {number} id
   * @returns {Subject<void> | null}
   */
  get(id: number | string): Subject<void> | null {
    return this.exist(id) ? this.notifiers[id] : null;
  }

  /**
   * Drops a notifier.
   * @param {number} id
   */
  delete(id: number | string): void {
    if (this.exist(id)) {
      this.notifiers[id].complete();
      delete this.notifiers[id];
    }
  }

  /**
   * Says if the the given id already exists.
   * @param {number} id
   * @returns {boolean}
   */
  exist(id: number | string): boolean {
    return this.notifiers[id] !== undefined;
  }
}
