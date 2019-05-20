import { Component } from '@angular/core';

// Services.
import { AuthentificationService } from '../../web-service/authentification/authentification.service';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private readonly auth: AuthentificationService,
              private readonly sidenav: SidenavService) {}

  /** Logout the user. */
  logout() {
    this.auth.logout();
  }

  /** Toggles the sidenav. */
  toggleSidenav() {
    this.sidenav.toggle();
  }
}
