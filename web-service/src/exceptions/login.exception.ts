import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Error raised when the user doesn't exist or the password is incorrect.
 */
export class LoginException extends HttpException {

  constructor() {
    super('User or password incorrect.', HttpStatus.BAD_REQUEST);
  }
}
