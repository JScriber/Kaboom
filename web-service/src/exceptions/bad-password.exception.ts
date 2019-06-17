import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Error raised whenever the given password is incorrect.
 */
export class BadPasswordException extends HttpException {

  constructor() {
    super('The password is incorrect.', HttpStatus.BAD_REQUEST);
  }
}
