import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';

import { TokenService } from '@service/token/token.service';

/** Payload of the token. */
export interface Payload {
  id: number;
  uuid: string;
}

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenService) {}

  /**
   * Returns the user with the token.
   * @param {string} token
   * @returns {Promise<User>}
   */
  async validateUser(token: string): Promise<User> {
    const payload = this.tokenService.extractFrom(token);

    return await this.userRepository.findOne(payload);
  }
}
