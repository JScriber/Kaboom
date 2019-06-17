import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

import { environment } from '@environment';

import { User, Language } from '@entity/user.entity';
import { TokenService } from '@service/token/token.service';
import { UpdateUser, UpdatePassword, CreateUser, Credentials, Token } from '@model/user';

// Exceptions.
import { CredentialsUsedException } from '../../../exceptions/credentials-used.exception';
import { BadPasswordException } from '../../../exceptions/bad-password.exception';
import { LoginException } from '../../../exceptions/login.exception';

// Typing interface.
import { IUserService } from '../user.service.model';

/** Default language. */
const DEFAULT_LANGUAGE = Language.English;

/**
 * Implementation of the {@link IUserService} interface.
 */
@Injectable()
export class GeneralUserService implements IUserService {

  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly tokenService: TokenService) {}

  /** @inheritdoc */
  async update(user: User, informations: UpdateUser): Promise<User> {

    // Patches informations.
    user.username = informations.username;
    user.email = informations.email;
    user.language = informations.language || DEFAULT_LANGUAGE;

    try {
      return await this.repository.save(user);
    } catch (error) {
      // Credentials already used.
      if (error.code === '23505') {
        throw new CredentialsUsedException();
      } else {
        // Unknown error.
        throw new InternalServerErrorException('Cannot update the current user.');
      }
    }
  }

  /** @inheritdoc */
  async updatePassword(user: User, { oldPassword, newPassword }: UpdatePassword): Promise<User> {

    if (await this.checkPassword(user, oldPassword)) {

      user.password = await Bcrypt.hash(newPassword, user.salt);

      return this.repository.save(user);
    } else {
      throw new BadPasswordException();
    }
  }

  /** @inheritdoc */
  async delete(user: User, password: string): Promise<boolean> {

    if (await this.checkPassword(user, password)) {

      return (await this.repository.delete(user.id)).affected === 1;
    } else {
      throw new BadPasswordException();
    }
  }

  /** @inheritdoc */
  async login({ username, password }: Credentials): Promise<Token> {

    // Search the requested user.
    const user: User = await this.repository.findOne({ username });

    if (user !== undefined && (await this.checkPassword(user, password))) {

      return this.generateToken(user);
    } else {
      throw new LoginException();
    } 
  }

  /** @inheritdoc */
  async signUp(informations: CreateUser): Promise<Token> {

    const user = new User();

    // Set basic informations.
    user.username = informations.username;
    user.email = informations.email;
    user.language = informations.language || DEFAULT_LANGUAGE;

    // Set the salt.
    user.salt = await Bcrypt.genSalt(environment.security.roundEncryption);

    // Encrypt password.
    user.password = await Bcrypt.hash(informations.password, user.salt);

    // Persist the user.
    try {
      const savedUser = await this.repository.save(user);
      
      return this.generateToken(savedUser);
    } catch (error) {
      // Credentials already used.
      if (error.code === '23505') {
        throw new CredentialsUsedException();
      } else {
        // Unknown error.
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Says if the given password is the good password.
   * @param {User} user
   * @param {string} testedPassword - Password to test.
   * @returns {Promise<boolean>}
   */
  private async checkPassword(user: User, testedPassword: string): Promise<boolean> {
    return user.password === await Bcrypt.hash(testedPassword, user.salt);
  }

  /**
   * Generates a token for the {@link User}.
   * @param {User} user
   * @returns {Token}
   */
  private generateToken({ id, uuid }: User): Token {
    const token = this.tokenService.generateFrom({ id, uuid });

    return new Token(token);
  }
}
