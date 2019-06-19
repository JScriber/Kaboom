import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Error raised whenever the credentials are already used.
 */
export class CredentialsUsedException extends HttpException {

  constructor() {
    super('The credentials are already used.', HttpStatus.CONFLICT);
  }
}
