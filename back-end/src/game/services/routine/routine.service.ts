import { Injectable } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';

/** Cycle rate in miliseconds of a routine. */
const CYCLE_RATE = 30;

@Injectable()
export class RoutineService {

  /** Stack of routine subscriptions. */
  private stack: Subscription[] = [];

  /** Starts a routine. */
  start(): Subscription {
    const sub = interval(CYCLE_RATE).subscribe(() => {
      // Routine execution.
      // TODO: Get application context and share it with the handlers.
      // TODO: Deserialize all the commands.
      // TODO: Execute them in a bus.
    });

    this.stack.push(sub);
    return sub;
  }

  /**
   * Ends a routine.
   * @param {Subscription} subscription
   */
  kill(subscription: Subscription): void {
    this.stack.splice(this.stack.indexOf(subscription), 1);
    subscription.unsubscribe();
  }

  /** Ends all the routines. */
  killAll(): void {
    this.stack.forEach(sub => sub.unsubscribe());
    this.stack = [];
  }
}
