import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** Service to manipulate the state of the sidenav. */
@Injectable()
export class SidenavService {

  private opened: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /** State of the sidenav. */
  get state() {
    return this.opened.asObservable();
  }

  /** Toggles the sidenav. */
  toggle() {
    this.opened.next(!this.opened.value);
  }
}
