import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Error raised whenever the given map is not found.
 */
export class MapNotFoundException extends HttpException {

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
