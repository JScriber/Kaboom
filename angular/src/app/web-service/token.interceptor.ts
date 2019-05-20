import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification/authentification.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly auth: AuthentificationService) {}

  /**
   * Intercepts HTTP requests.
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Add the token to the request.
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken() || ''}`
      }
    });

    return next.handle(request);
  }
}
