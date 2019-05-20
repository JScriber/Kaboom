import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonConverterService, Class } from '../json-converter/json-converter.service';

/**
 * Base mock class.
 */
@Injectable()
export class BaseMock {

  /** Mock files folder. */
  private static readonly MOCK_FOLDER = 'assets/mocks';

  constructor(private readonly http: HttpClient,
              private readonly jsonConverter: JsonConverterService) {}

  /**
   * Fetches a mock resource.
   * @param {string} path
   * @returns {Observable<T>}
   */
  protected fetch<T>(path: string): Observable<T> {
    return this.http.get<T>(this.buildFilePath(path));
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
   * Builds the full file path.
   * @param {string} path
   * @returns {string}
   */
  private buildFilePath(path: string): string {
    return `${BaseMock.MOCK_FOLDER}/${path}`.replace(/\/\/+/g, '/');
  }
}
