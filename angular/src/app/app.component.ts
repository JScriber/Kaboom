import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

// Services.
import { SidenavService } from './layouts/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
}