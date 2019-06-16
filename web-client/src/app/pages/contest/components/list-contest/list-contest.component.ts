import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, interval } from 'rxjs';
import { switchMap, takeUntil, startWith } from 'rxjs/operators';

// Models.
import { ContestIndex } from '../../models/join-contest/contest-index.model';

// Webservice communication service.
import { ContestApiService } from '../../services/contest-api/api/contest-api.service';

/** Interval when the data is refreshed (in milliseconds). */
const REFRESH_INTERVAL = 10000;

@Component({
  selector: 'app-list-contest',
  templateUrl: './list-contest.component.html',
  styleUrls: ['./list-contest.component.scss']
})
export class ListContestComponent implements OnDestroy {

  /** Handles unsubscriptions. */
  subscriptionHandler$ = new Subject();

  /** All the games available. */
  previews$: Observable<ContestIndex[]> = interval(REFRESH_INTERVAL).pipe(
    startWith(0),
    takeUntil(this.subscriptionHandler$),
    switchMap(() => this.webService.list())
  );

  constructor(private readonly router: Router,
              private readonly webService: ContestApiService) {}

  /**
   * Called when the user clicks on a preview.
   * @param {number} id
   */
  join(uuid: string) {
    this.router.navigate(['/game/join', uuid]);
  }

  ngOnDestroy() {
    this.subscriptionHandler$.next();
  }
}
