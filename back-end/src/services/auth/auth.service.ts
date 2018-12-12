import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../../entities/player/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Player)
    private readonly playerRepository: Repository<Player>) {}

  /**
   * Returns the user with the token.
   * @param {string} token
   * @returns {Promise<Player>}
   */
  async validatePlayer(token: string): Promise<Player> {
    return await this.playerRepository.findOne({ token });
  }
}
