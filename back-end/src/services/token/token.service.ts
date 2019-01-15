import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Player } from 'src/entities/player/player.entity';
import { SignOptions } from 'jsonwebtoken';
import { environment } from '@environment';

/** Fields used to generate the token. */
interface TokenContent {
  id: number;
  uuid: string;
  username: string;
}

@Injectable()
export class TokenService {

  /** Constructor. */
  constructor(private readonly jwt: JwtService) {}

  /**
   * Extract the informations out of the token.
   * @param token 
   */
  verify(token: string): TokenContent {
    return this.jwt.verify<TokenContent>(token, {});
  }

  /**
   * Says if the token is valid.
   * @param {string} token
   * @param {string} uuid
   * @returns {boolean}
   */
  valid(token: string, uuid: string): boolean {
    let isValid = false;

    try {
      const values = this.verify(token);
      isValid = values.uuid === uuid;
    } catch (e) {}

    return isValid;
  }

  /**
   * Generates a token from a player.
   * @param {Player} player - Player to get the informations.
   * @returns {Promise<string>}
   */
  generate(player: Player): string {
    const informations: TokenContent = {
      id: player.id,
      uuid: player.uuid,
      username: player.username
    };

    // Options for token generation.
    const options: SignOptions = {
      algorithm: 'HS256',
      expiresIn: environment.security.tokenExpiration
    };

    // Handle possible errors.
    return this.jwt.sign(informations, options);
  }
}
