/**
 * Collection of reusable regex.
 */
export const Validations: { [key: string]: RegExp } = {
  password: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
};
