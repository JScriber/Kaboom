import { Injectable } from '@angular/core';
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { PropertyMatchingRule } from 'json2typescript/src/json2typescript/json-convert-enums';

import { environment } from '../../../environments/environment';

/** Class reference type. */
export type Class<T> = new () => T;

/**
 * Provides methods for JSON serialization/deserialization.
 */
@Injectable()
export class JsonConverterService {

  /** JSON converter. */
  private readonly converter = new JsonConvert(
    environment.debug ? OperationMode.LOGGING : OperationMode.ENABLE,
    ValueCheckingMode.DISALLOW_NULL,
    false,
    PropertyMatchingRule.CASE_STRICT
  );

  /**
   * Deserializes the given JSON object.
   * @template T - Returned type.
   * @param {any} object - The JSON object.
   * @param {Class<T>} classReference - The class reference.
   * @returns {T}
   */
  deserialize<T>(object: any, classReference: Class<T>): T {
    return this.converter.deserializeObject<T>(object, classReference);
  }

  /**
   * Deserializes the given array.
   * @template T - Returned type.
   * @param {any[]} objects - Array of JSON objects.
   * @param {Class<T>} classReference - The class reference.
   * @returns {T[]}
   */
  deserializeArray<T>(objects: any[], classReference: Class<T>): T[] {
    return this.converter.deserializeArray<T>(objects, classReference);
  }

  /**
   * Serializes the given instance.
   * @template T - Instance type.
   * @template O - Output type.
   * @param {T} instance - Real JavaScript object.
   * @returns {O}
   */
  serialize<T, O = any>(instance: T): O {
    return this.converter.serializeObject(instance);
  }

  /**
   * Serializes the given array.
   * @template T - Instance type.
   * @template O - Output type.
   * @param {T[]} instance - Array of real objects.
   * @returns {O[]}
   */
  serializeArray<T, O = any>(instance: T[]): O[] {
    return this.converter.serializeArray(instance);
  }
}
