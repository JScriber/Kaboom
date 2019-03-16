import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../../entities/player/player.entity';
import { Repository } from 'typeorm';

import { TokenService } from '@service/token/token.service';

/** Payload of the token. */
export interface Payload {
  id: number;
  uuid: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly tokenService: TokenService) {}

  /**
   * Returns the user with the token.
   * @param {string} token
   * @returns {Promise<Player>}
   */
  async validatePlayer(token: string): Promise<Player> {
    const payload = this.tokenService.extractFrom(token);

    return await this.playerRepository.findOne(payload);
  }
}
