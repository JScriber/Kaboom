import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SelectItem {
  key: string;
  image: string;
  title: string;
  description: string;
  state: boolean;
}

interface SelectListData {
  searchLabel: string;
  items: SelectItem[];
}

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent {

  /** List of all the items. */
  items: SelectItem[];

  /** Label of the searchbar. */
  searchLabel: string;

  constructor(private readonly dialog: MatDialogRef<SelectListComponent>,
              @Inject(MAT_DIALOG_DATA) data: SelectListData) {

    this.items = JSON.parse(JSON.stringify(data.items));
    this.searchLabel = data.searchLabel;
  }

  /** 
   * Toggles the given item.
   * @param {SelectItem} item
   */
  toggle({ key }: SelectItem) {
    this.items = this.items.map(i => {

      if (i.key === key) {
        i.state = !i.state;
      }

      return i;
    });
  }

  /** Sends the data and closes the modal. */
  send() {
    this.dialog.close(this.items);
  }

  /** Closes the modal. */
  close() {
    this.dialog.close();
  }
}
