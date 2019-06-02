import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification/authentification.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private readonly auth: AuthentificationService) {}

  canActivate(): boolean | Observable<boolean> {
    const authentificated: boolean = this.auth.isAuthentificated();

    if (!authentificated) this.auth.redirectLogin();

    return authentificated;
  }
}
