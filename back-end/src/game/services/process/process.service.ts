import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { GAME_STATE_ROUTE, GameWebSocket } from 'src/game/gateways/game.gateway';
import Game from 'src/game/model/game';

/** Throughput in miliseconds. */
const THROUGHPUT: number = 100;

interface Processes {
  [key: number]: Subscription;
}

export class ProcessHandler {

  /** Map of processes. */
  private readonly processes: Processes = {};

  constructor(private readonly gateway: GameWebSocket) {}

  /**
   * Starts a new process.
   * @param {number} id
   */
  start(id: number): void {
    // Create a new lock notifier.
    this.mutex.create(id);

    // Start the process.
    this.processes[id] = interval(THROUGHPUT).pipe(
      switchMap(() => this.gateway.redis.getGameState(id))
    )
    .subscribe(game => this.gateway.emit(`${GAME_STATE_ROUTE}/${game.id}`, game));
  }

  /**
   * Stops a running process.
   * @param {number} id
   */
  stop(id: number): void {
    this.mutex.drop(id);

    if (this.processes[id]) {
      this.processes[id].unsubscribe();
    }
  }
}
