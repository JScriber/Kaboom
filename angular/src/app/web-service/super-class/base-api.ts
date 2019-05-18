import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Base API class.
 */
export abstract class BaseApi {

  /** Base url. */
  protected abstract baseUrl: string;

  constructor(private readonly http: HttpClient) {}

  /**
   * GET request.
   * @template T - Returned data type.
   * @param {string | number} [url = ''] - Resource URL.
   * @param {HttpParams} [params = new HttpParams()] - Optional parameters.
   * @returns {Observable<T>}
   */
  protected getRequest<T>(url: string | number = '', params = new HttpParams()): Observable<T> {
    return this.http.get<T>(this.buildUrl(url), { params });
  }

  /**
   * Builds the full request URL.
   * @param {string | number} url
   * @returns {string}
   */
  private buildUrl(url: string | number): string {
    return `${environment.apiUrl}/${this.baseUrl}/${url}`.replace(/([^:])\/\/+/g, '$1/');
  }
}
