import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** Mode available for sidenav. */
type Mode = 'over' | 'push' | 'side';

/** Minimal width at which the component retracts. */
const MIN_WINDOW_WIDTH: number = 830;

/** Delay between resizing actions (in milliseconds). */
const TIMEOUT = 20;

/** Service to manipulate the state of the sidenav. */
@Injectable()
export class SidenavService {

  /** Observable state. */
  private opened: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /** Observable mode. */
  private displayMode: BehaviorSubject<Mode> = new BehaviorSubject<Mode>('side');

  /** JavaScript timeout ID. */
  private resizeTimeout: NodeJS.Timer;

  /** State of the sidenav. */
  get state() {
    return this.opened.asObservable();
  }

  /** Mode of the sidenav. */
  get mode() {
    return this.displayMode.asObservable();
  }

  /** Toggles the sidenav. */
  toggle() {
    this.opened.next(!this.opened.value);
  }

  /** Opens the sidenav. */
  open() {
    this.opened.next(true);
  }

  /** Closes the sidenav. */
  close() {
    this.opened.next(false);
  }

  /**
   * Called whenever the window get resized.
   * @param {number} width
   */
  bindWindowResize(width: number) {
    const opened = this.opened.getValue();

    const launchSmallMode = width < MIN_WINDOW_WIDTH && opened;
    const launchWideMode = width > MIN_WINDOW_WIDTH && !opened;
 
    if (launchSmallMode || launchWideMode) {
      // Clear previous resizing.
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(() => {
        this.determineMode(launchSmallMode, launchWideMode);
        this.toggle();
      }, TIMEOUT);
    }
  }

  /**
   * Determines the display mode.
   * @param {boolean} smallMode
   * @param {boolean} wideMode
   */
  private determineMode(smallMode: boolean, wideMode: boolean) {
    if (smallMode) {
      this.displayMode.next('over');
    } else {
      if (wideMode) {
        this.displayMode.next('side');
      }
    }
  }
}
