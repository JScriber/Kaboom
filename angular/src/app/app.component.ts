import { Component, ChangeDetectionStrategy, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

// Services.
import { SidenavService } from './layouts/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  /** Determines which layout to display. */
  minimized$: Observable<boolean> = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute.firstChild),
      switchMap(route => route.data),
      map(data => data && data['minimized'])
    );

  constructor(translate: TranslateService,
              private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly sidenav: SidenavService) {

    translate.setDefaultLang('fr');
  }

  /** State of the sidenav. */
  get sidenavState() {
    return this.sidenav.state;
  }

  /** Mode of the sidenav. */
  get sidenavMode() {
    return this.sidenav.mode;
  }

  ngOnInit() {
    this.sidenav.bindWindowResize(window.innerWidth);
  }

  /**
   * Listens for window resizing.
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width = event.target.innerWidth;

    this.sidenav.bindWindowResize(width);
  }

  /** Closes the sidenav. */
  closeDrawer() {
    this.sidenav.close();
  }
}
