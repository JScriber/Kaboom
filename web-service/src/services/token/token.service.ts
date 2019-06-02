import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { environment } from '@environment';

@Injectable()
export class TokenService {

  /** Token encryption options. */
  private readonly options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: environment.security.tokenExpiration
  };

  constructor(private readonly jwt: JwtService) {}

  /**
   * Generates a token from the input.
   * @template I - Payload type.
   * @param {I} payload
   * @returns {string}
   */
  generateFrom<I>(payload: I): string {
    return this.jwt.sign(payload, this.options);
  }

  /**
   * Extract the informations out of the token.
   * @param token
   */
  extractFrom<T extends object>(token: string): T {
    return this.jwt.verify<T>(token, {});
  }
}
