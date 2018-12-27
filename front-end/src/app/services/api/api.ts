import axios, { AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environment';
import Token from './token';

/** General structure of errors. */
interface HTTPError {
  statusCode: number;
  error: string;
  message: any;
}

/**
 * Api service singleton.
 */
export class ApiService {
  /** Unique instance of the service. */
  private static apiInstance: ApiService;

  /**
   * Delivers the instance of the Api service.
   */
  public static instance(): ApiService {
    if (!ApiService.apiInstance) {
      ApiService.apiInstance = new this();
    }

    return ApiService.apiInstance;
  }

  /** Headers put on requests. */
  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  /** Authentification token. */
  private token = new Token();

  private constructor() {
    const token: string | null = this.token.fetch();

    if (token) {
      this.setBearer(token);
    }
  }

  /**
   * Sets the token of the user.
   * @param {string} token - New token.
   */
  public setToken(token: string): void {
    this.token.set(token);
    this.setBearer(token);
  }

  /**
   * Get request.
   * @template T - Returned type.
   * @param {string | number} path
   * @returns {Observable<T>}
   */
  public get<T>(path: string | number): Observable<T> {
    return this.handler(axios.get<T>(this.buildURI(path)));
  }

  /**
   * Post request.
   * @template T - Returned type.
   * @param {string} path
   * @param {any} data
   * @returns {Observable<T>}
   */
  public post<T>(path: string, data: any): Observable<T> {
    return this.handler(
      axios.post<T>(this.buildURI(path), data, {
        headers: this.headers
      })
    );
  }

  /**
   * Put request.
   * @template T - Returned type.
   * @param {string} path
   * @param {any} data
   * @returns {Observable<T>}
   */
  public put<T>(path: string, data: any): Observable<T> {
    return this.handler(
      axios.put<T>(this.buildURI(path), data, {
        headers: this.headers
      })
    );
  }

  /**
   * Delete request.
   * @template T - Returned type.
   * @param {string} path
   * @returns {Observable<T>}
   */
  public delete<T>(path: string): Observable<T> {
    return this.handler(axios.delete(this.buildURI(path)));
  }

  /**
   * Transforms the given promise into a treated observable.
   * @template T
   * @param {Promise<AxiosResponse<T>>} promise
   * @returns {Observable<T>}
   */
  private handler<T>(promise: Promise<AxiosResponse<T>>): Observable<T> {
    return from(promise).pipe(
      catchError(res => this.errorHandler(res)),
      map(res => res.data)
    );
  }

  /**
   * Handles the errors.
   * @param {AxiosError} res - Error caught.
   * @returns {Observable<never>} - Always throws an error.
   */
  private errorHandler(res: AxiosError): Observable<never> {
    const data: HTTPError = (res.response as AxiosResponse<any>).data;

    // General handling for authentification.
    if (data && data.statusCode === 401) {
      console.log('Authentification error.');
      this.removeBearer();
      // ! TODO: Redirect to login.
    }

    return throwError(data);
  }

  /**
   * Builds the path.
   * @param {string | number} path
   * @returns {string}
   */
  private buildURI(path: string | number): string {
    return `${environment.server}/${path}`.replace(/([^:])\/\/+/g, '$1/');
  }

  /**
   * Set the bearer token in the headers.
   * @param {string} token
   */
  private setBearer(token: string): void {
    this.headers.set('Authorization', `Bearer ${token}`);
  }

  /** Removes the bearer. */
  private removeBearer(): void {
    this.headers.delete('Authorization');
  }
}
