import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';

// Models.
import { WaitContest } from '../../models/wait-contest/wait-contest.model';
import { StartContest } from '../../models/wait-contest/start-contest.model';

// Services.
import { JsonConverterService, Class } from '../../../../web-service/json-converter/json-converter.service';

/** Informations on the socket rooms. */
interface Rooms {
  start: string;
  wait: string;
}

/**
 * Notifies of actions in the waiting room.
 */
@Injectable()
export class WaitingRoomSocket extends Socket {

  /** Notifies when a new user logs in. */
  wait$: Observable<WaitContest>;

  /** Notifies when the game starts. */
  start$: Observable<StartContest>;

  /** Handles subscriptions. */
  private subscriptionHandler$ = new Subject();

  constructor(private readonly converter: JsonConverterService) {
    super({
      url: environment.wsUrl,
      options: {
        path: '/contest'
      }
    });
  }

  /**
   * Establishes a connection to the rooms.
   * @param {string} token
   * @param {Rooms} rooms
   */
  init(token: string, { wait, start }: Rooms) {

    console.log('Init');

    // Set handshake.
    this.ioSocket.query = { token };

    this.wait$ = this.listenRoom(wait, WaitContest);

    this.start$ = this.listenRoom(start, StartContest);
  }

  /** Disconnects from all rooms. */
  disconnect() {
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
