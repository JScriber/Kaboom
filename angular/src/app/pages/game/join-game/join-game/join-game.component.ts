import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { switchMap, takeUntil, startWith } from 'rxjs/operators';

import { Preview } from '../models/preview.model';
import { JoinGameApiService } from '../services/api/join-game-api.service';

/** Interval when the data is refreshed (in milliseconds). */
const REFRESH_INTERVAL = 2000;

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnDestroy {

  /** Handles unsubscriptions. */
  subscriptionHandler$ = new Subject();

  /** All the games available. */
  previews$: Observable<Preview[]> = interval(REFRESH_INTERVAL).pipe(
    startWith(0),
    takeUntil(this.subscriptionHandler$),
    switchMap(() => this.webService.getPreviews())
  );

  constructor(private readonly webService: JoinGameApiService) {}

  /**
   * Called when the user clicks on a preview.
   * @param {number} id
   */
  access(id: number) {
    console.log(id);
  }

  ngOnDestroy() {
    this.subscriptionHandler$.next();
  }
}
