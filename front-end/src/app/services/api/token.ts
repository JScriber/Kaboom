const tokenStorage = 'token';

export default class Token {

  private token: string | null = null;

  constructor() {}

  /**
   * Fetches the token.
   * @returns {string | null}
   */
  public fetch(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem(tokenStorage);
    }

    return this.token;
  }

  /**
   * Sets the token in localStorage.
   * @param {string} token
   */
  public set(token: string): void {
    localStorage.setItem(tokenStorage, token);
    this.token = token;
  }
}
