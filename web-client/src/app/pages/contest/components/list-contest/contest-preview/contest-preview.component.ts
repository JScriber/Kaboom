import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ContestIndex } from '../../../models/join-contest/contest-index.model';

@Component({
  selector: 'app-contest-preview',
  templateUrl: './contest-preview.component.html',
  styleUrls: ['./contest-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContestPreviewComponent implements OnInit {

  /** Game preview informations. */
  @Input() data: ContestIndex;

  /** Click on the preview. */
  @Output() join: EventEmitter<string> = new EventEmitter();

  /** Slot state. */
  slots: boolean[];

  /** Called when the preview is clicked. */
  handleClick() {
    this.join.emit(this.data.uuid);
  }

  ngOnInit() {
    this.slots = Array(this.data.slots.total).fill(false);

    for (let i = 0; i < this.data.slots.taken; i ++) {
      this.slots[i] = true;
    }
  }
}
