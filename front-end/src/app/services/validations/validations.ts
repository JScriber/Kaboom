/**
 * List of all the validations regexp.
 */
export namespace Validations {
  
  /**
   * Password pattern.
   * Must contain 6 characters, uppercase and lowercase letters, and a special character.
   */
  export const password: RegExp = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
}
