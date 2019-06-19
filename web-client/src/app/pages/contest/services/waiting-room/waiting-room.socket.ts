import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';

// Models.
import { ContestWait } from '../../models/wait-contest/contest-wait.model';
import { StartContest } from '../../models/wait-contest/start-contest.model';
import { ContestAccessRooms } from '../../models/contest-access-rooms.model';

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
export class WaitingRoomSocket extends Socket {

  /** Notifies when a new user logs in. */
  wait$: Observable<ContestWait>;

  /** Notifies when the game starts. */
  start$: Observable<StartContest>;

  disconnect$ = this.fromEvent<void>('disconnect');

  /** Handles subscriptions. */
  private subscriptionHandler$ = new Subject();

  constructor(token: string, rooms: ContestAccessRooms, private readonly converter: JsonConverterService) {
    super({
      url: environment.apiUrl,
      options: {
        query: { token }
      }
    });

    this.ioSocket.nsp = '/wait';

    this.wait$ = this.listenRoom(rooms.wait, ContestWait);

    this.start$ = this.listenRoom(rooms.start, StartContest);
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
