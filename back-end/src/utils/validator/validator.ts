/**
 * Util class that provides regexp to test inputs.
 */
export class Validator {
  /** Test email. */
  static readonly EMAIL: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  /** Medium password. */
  static readonly MEDIUM_PASSWORD: RegExp = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);
  /**
   * Operates a test comparaison.
   * @param {string} input
   * @param {RegExp} regex
   * @returns {boolean}
   */
  public static test(input: string, regex: RegExp): boolean {
    return regex.test(input);
  }
}
