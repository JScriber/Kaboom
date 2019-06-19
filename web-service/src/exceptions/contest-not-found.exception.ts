import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Error raised whenever the given contest is not found.
 */
export class ContestNotFoundException extends HttpException {

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
