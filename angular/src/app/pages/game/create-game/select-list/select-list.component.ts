import { Component } from '@angular/core';

export interface SelectItem {
  key: string;
  image: string;
  title: string;
  description: string;
  initialState: boolean;
}

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent {

}
