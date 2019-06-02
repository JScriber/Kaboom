import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { JsonConverterService, Class } from '../json-converter/json-converter.service';

/**
 * Base API class.
 */
@Injectable()
export abstract class BaseApi {

  /** Base URL. */
  protected abstract baseUrl: string;

  constructor(private readonly http: HttpClient,
              protected readonly jsonConverter: JsonConverterService) {}

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
   * POST request.
   * @template T - Returned data type.
   * @template B - Body type.
   * @param {string | number} url - Server URL.
   * @param {B} body - Post body.
   * @param {HttpParams} [params = new HttpParams()] - Optional parameters.
   * @returns {Observable<T>}
   */
  protected postRequest<T, B>(url: string | number, body: B, params = new HttpParams()): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), body, { params });
  }

  /**
   * PUT request.
   * @template T - Returned data type.
   * @template B - Body type.
   * @param {string | number} url - Server URL.
   * @param {B} body - Put body.
   * @param {HttpParams} [params = new HttpParams()] - Optional parameters.
   * @returns {Observable<T>}
   */
  protected putRequest<T, B>(url: string | number, body: B, params = new HttpParams()): Observable<T> {
    return this.http.put<T>(this.buildUrl(url), body, { params });
  }

  /**
   * DELETE request.
   * @template T - Returned data type.
   * @param {string | number} url - Resource URL.
   * @param {HttpParams} [params = new HttpParams()] - Optional parameters.
   * @returns {Observable<T>}
   */
  protected deleteRequest<T>(url: string | number, params = new HttpParams()): Observable<T> {
    return this.http.delete<T>(this.buildUrl(url), { params });
  }

  /**
   * PATCH request.
   * @template T - Returned data type.
   * @template B - Body type.
   * @param {string | number} url - Server URL.
   * @param {B} body - Patch body.
   * @param {HttpParams} [params = new HttpParams()] - Optional parameters.
   * @returns {Observable<T>}
   */
  protected patchRequest<T, B>(url: string | number, body: B, params = new HttpParams()): Observable<T> {
    return this.http.patch<T>(this.buildUrl(url), body, { params });
  }

  /**
   * OPTIONS request.
   * @template T - Returned data type.
   * @param {string | number} [url = ''] - Resource URL.
   * @param {HttpHeaders} [headers = new HttpHeaders()] - Optional headers.
   * @param {HttpParams} [params = new HttpParams()] - Optional parameters.
   * @returns {Observable<T>}
   */
  protected optionsRequest<T>(url: string | number = '', headers = new HttpHeaders(), params = new HttpParams()): Observable<T> {
    return this.http.options<T>(this.buildUrl(url), { headers, params });
  }

  /**
   * Deserializes the stream content.
   * @template I - Input type.
   * @template O - Output type.
   * @param {Observable<I>} stream
   * @param {Class<O>} classReference - Deserialization class reference.
   * @returns {Observable<O>}
   */
  protected deserialize<I, O>(stream: Observable<I>, classReference: Class<O>): Observable<O> {
    return stream.pipe(map(d => this.jsonConverter.deserialize(d, classReference)));
  }

  /**
   * Deserializes the stream content.
   * @template I - Input type.
   * @template O - Output type.
   * @param {Observable<I[]>} stream
   * @param {Class<O>} classReference - Deserialization class reference.
   * @returns {Observable<O[]>}
   */
  protected deserializeArray<I, O>(stream: Observable<I[]>, classReference: Class<O>): Observable<O[]> {
    return stream.pipe(map(d => this.jsonConverter.deserializeArray(d, classReference)));
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
