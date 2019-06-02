import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wait-game',
  templateUrl: './wait-game.component.html',
  styleUrls: ['./wait-game.component.scss']
})
export class WaitGameComponent implements OnInit {

  /** Link to access the game. */
  shareUrl = new FormControl();

  /** Unique game identifier. */
  private uuid: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly clipboardService: ClipboardService) {}

  /** Copies the URL to the clipboard. */
  copyUrl() {
    this.clipboardService.copyFromContent(this.shareUrl.value);
  }

  ngOnInit() {
    this.shareUrl.setValue(window.location.href);

    this.route.params.subscribe(({ uuid }) => {
      this.uuid = uuid;

      // TODO: Establish connection to WS.
      console.log(this.uuid);
    });
  }
}
