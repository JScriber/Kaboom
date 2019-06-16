import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

import { ContestApiService } from '../../services/contest-api/api/contest-api.service';
import { take, switchMap } from 'rxjs/operators';
import { ContestJoin } from '../../models/join-contest/contest-join.model';
import { WaitingRoomSocket } from '../../services/waiting-room/waiting-room.service';

@Component({
  selector: 'app-join-contest',
  templateUrl: './join-contest.component.html',
  styleUrls: ['./join-contest.component.scss']
})
export class JoinContestComponent implements OnInit {

  /** Says if the component is loading. */
  loading = true;

  /** Link to access the game. */
  shareUrl = new FormControl();

  /** Unique game identifier. */
  private uuid: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly clipboardService: ClipboardService,
              private readonly webservice: ContestApiService,
              private readonly waitingRoom: WaitingRoomSocket) {}

  /** Copies the URL to the clipboard. */
  copyUrl() {
    this.clipboardService.copyFromContent(this.shareUrl.value);
  }

  ngOnInit() {
    this.shareUrl.setValue(window.location.href);

    this.route.params.pipe(
      take(1),
      switchMap(({ uuid }) => {
        const join = new ContestJoin();
        join.uuid = uuid;

        return this.webservice.join(join);
      })
    ).subscribe(({ token, startRoom, waitRoom }) => {
      this.waitingRoom.init(token, {
        wait: waitRoom,
        start: startRoom
      });

      this.waitingRoom.wait$.subscribe(data => {
        console.log('Refresh with', data);
      });

      this.waitingRoom.start$.subscribe(data => {
        console.log('Start', data);
      })
    });
  }
}
