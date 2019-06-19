import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, NEVER } from 'rxjs';
import { take, switchMap, catchError } from 'rxjs/operators';
import { ClipboardService } from 'ngx-clipboard';

// Services.
import { ContestApiService } from '../../services/contest-api/api/contest-api.service';
import { JsonConverterService } from '../../../../web-service/json-converter/json-converter.service';
import { WaitingRoomSocket } from '../../services/waiting-room/waiting-room.socket';

// Models.
import { ContestJoin } from '../../models/join-contest/contest-join.model';
import { ContestAccess } from '../../models/contest-access.model';
import { ContestSlots } from '../../models/contest-slots.model';
import { ContestWait } from '../../models/wait-contest/contest-wait.model';

@Component({
  selector: 'app-join-contest',
  templateUrl: './join-contest.component.html',
  styleUrls: ['./join-contest.component.scss']
})
export class JoinContestComponent implements OnInit, OnDestroy {

  /** Says if the component is loading. */
  loading = true;

  /** Link to access the game. */
  shareUrl = new FormControl();

  /** Says if has reached the play mode. */
  play = false;

  /** Says if the component has been destroyed. */
  destroyed = false;

  /** Socket. */
  private waitingRoomSocket: WaitingRoomSocket;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly clipboardService: ClipboardService,
              private readonly webservice: ContestApiService,
              private readonly converter: JsonConverterService,
              private readonly cdr: ChangeDetectorRef) {}

  /** Copies the URL to the clipboard. */
  copyUrl() {
    this.clipboardService.copyFromContent(this.shareUrl.value);
  }

  /**
   * Waiting contest informations.
   * @returns {Observable<ContestWait>}
   */
  get wait$() {
    return this.waitingRoomSocket.wait$;
  }

  /**
   * Builds a slot array.
   * @param contest
   * @returns {boolean[]}
   */
  getSlots(contest: ContestWait): boolean[] {
    const slots = Array(contest.slots.total).fill(false);

    for (let i = 0; i < contest.slots.taken; i ++) {
      slots[i] = true;
    }

    return slots;
  }

  ngOnInit() {
    this.shareUrl.setValue(window.location.href);

    this.route.params.pipe(
      take(1),
      switchMap(({ uuid }) => this.join(uuid)),
      catchError(() => {
        this.redirect();

        return NEVER;
      })
    ).subscribe(({ token, rooms }) => {

      this.waitingRoomSocket = new WaitingRoomSocket(token, rooms, this.converter);

      this.waitingRoomSocket.start$.subscribe(token => {
        this.play = true;

        // Enter the game.
        this.router.navigate(['/game'], { state: token });
      });

      this.waitingRoomSocket.disconnect$.subscribe(() => this.redirect());

      this.loading = false;
      this.cdr.detectChanges();

    }, () => this.redirect);
  }

  ngOnDestroy() {
    this.destroyed = true;

    if (this.waitingRoomSocket) {
      this.waitingRoomSocket.disconnect();
    }
  }

  /**
   * Joins the contest with the given UUID.
   * @param uuid
   * @returns {Observable<ContestAccess>}
   */
  private join(uuid: string): Observable<ContestAccess> {
    const join = new ContestJoin();
    join.uuid = uuid;

    return this.webservice.join(join);
  }

  /**
   * Redirects to the selection page.
   */
  private redirect() {
    if (!this.destroyed && !this.play) {
      this.router.navigate(['/']);
    }
  }
}
