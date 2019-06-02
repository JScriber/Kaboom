import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Preview } from '../../models/preview.model';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePreviewComponent implements OnInit {

  /** Game preview informations. */
  @Input() data: Preview;

  /** Click on the preview. */
  @Output() access: EventEmitter<number> = new EventEmitter();

  /** Slot state. */
  slots: boolean[];

  /** Called when the preview is clicked. */
  handleClick() {
    this.access.emit(this.data.id);
  }

  ngOnInit() {
    this.slots = [];

    for (let i = 0; i < this.data.totalSlots; i ++) {
      this.slots.push(i + 1 <= this.data.emptySlots);
    }
  }
}
