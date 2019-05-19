import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';

import { SignedIn } from '../user-sign/models/signed-in.model';

interface JwtToken {
  id: number;
  uuid: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthentificationService {

  /** Place where the token is stored locally. */
  private static readonly LOCAL_TOKEN = 'token';

  constructor(private readonly router: Router) {}

  /**
   * Redirects to the login page.
   */
  redirectLogin() {
    this.router.navigateByUrl('/sign-in');
  }

  /**
   * Logins the user.
   * @param {SignedIn} payload
   */
  login(payload: SignedIn) {
    localStorage.setItem(AuthentificationService.LOCAL_TOKEN, payload.token);

    this.router.navigateByUrl('/');
  }

  /** Logouts the user. */
  logout() {
    localStorage.removeItem(AuthentificationService.LOCAL_TOKEN);
    this.redirectLogin();
  }

  /**
   * Says if the user is currently authentificated.
   * @returns {boolean}
   */
  isAuthentificated(): boolean {
    let authentificated = false;
    const token = localStorage.getItem(AuthentificationService.LOCAL_TOKEN);

    if (token) {
      authentificated = !this.tokenHasExpired(decode(token));
    }

    return authentificated;
  }

  /**
   * Says if the token has expired.
   * @param {JwtToken} decoded
   * @returns {boolean}
   */
  private tokenHasExpired(decoded: JwtToken): boolean {
    let expired = true;

    if (decoded && decoded.exp) {
      const date = new Date(0); 
      date.setUTCSeconds(decoded.exp);

      expired = !(date.valueOf() > new Date().valueOf());
    }

    return expired;
  }
}
