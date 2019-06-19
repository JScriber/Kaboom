import { Socket } from 'ngx-socket-io';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { JsonConverterService, Class } from '../../../web-service/json-converter/json-converter.service';

import { environment } from 'src/environments/environment';

/**
 * Executable action in the game room.
 */
export class GameRoomSocket extends Socket {

  /** Says when the socket is disconnected. */
  disconnect$ = this.fromEvent<void>('disconnect');

  /** Handles subscriptions. */
  private subscriptionHandler$ = new Subject();

  constructor(token: string, private readonly converter: JsonConverterService) {
    super({
      url: environment.apiUrl,
      options: {
        query: { token }
      }
    });

    this.ioSocket.nsp = '/play';
  }

  push() {
    this.emit('push', { message: 'hello' });
  }

  /** Disconnects from all rooms. */
  disconnect() {
    super.disconnect();

    this.subscriptionHandler$.next();
  }

  /**
   * Creates a listener to a room.
   * @template T - Room feed.
   * @param {string} room
   * @param {Class<T>} classRef
   * @returns {Observable<T>}
   */
  private listenRoom<T>(room: string, classRef: Class<T>): Observable<T> {

    return this.fromEvent<T>(room).pipe(
      map(d => this.converter.deserialize(d, classRef)),
      takeUntil(this.subscriptionHandler$)
    );
  }
}
