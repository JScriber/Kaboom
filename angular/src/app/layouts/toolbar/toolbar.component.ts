import { Component } from '@angular/core';
import { AuthentificationService } from '../../web-service/authentification/authentification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private readonly auth: AuthentificationService) {}

  /** Logout the user. */
  logout() {
    this.auth.logout();
  }
}
