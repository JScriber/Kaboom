/** Name of the token storage. */
const TOKEN_STORAGE = 'token';

/**
 * Token handler.
 */
export default class Token {

  /** Value of the token. */
  private token: string | null = null;

  /**
   * Fetches the token.
   * @returns {string | null}
   */
  public fetch(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(TOKEN_STORAGE);
    }

    return this.token;
  }

  /**
   * Sets the token in localStorage.
   * @param {string} token
   */
  public set(token: string): void {
    localStorage.setItem(TOKEN_STORAGE, token);
    this.token = token;
  }

  /**
   * Removes the token from the storage.
   */
  public delete(): void {
    localStorage.removeItem(TOKEN_STORAGE);
  }
}
