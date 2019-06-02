import { Subscription } from 'rxjs';

/** Map of running broadcasts. */
export interface Broadcasts {
  [key: number]: Subscription;
}
