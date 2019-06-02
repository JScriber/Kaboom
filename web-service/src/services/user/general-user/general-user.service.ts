import { Injectable, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcrypt';

import { environment } from '@environment';

import { UserRepository } from '@repository/user/user.repository';
import { User, Language } from '@entity/user/user.entity';
import { TokenService } from '@service/token/token.service';
import { UpdateUser, UpdatePassword, CreateUser, Credentials, Token } from '@model/user';

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
    @InjectRepository(UserRepository) private readonly repository: UserRepository,
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
        // TODO: Throw custom error.
        throw new ConflictException('The credentials are already used.');
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
      // TODO: Throw custom exception.
      throw new BadRequestException('Incorrect password.');
    }
  }

  /** @inheritdoc */
  async delete(user: User, password: string): Promise<boolean> {

    if (await this.checkPassword(user, password)) {

      return (await this.repository.delete(user.id)).affected === 1;
    } else {
      // TODO: Throw custom exception.
      throw new BadRequestException('Incorrect password');
    }
  }

  /** @inheritdoc */
  async login({ username, password }: Credentials): Promise<Token> {

    // Search the requested user.
    const user: User = await this.repository.findOne({ username });

    if (user !== undefined && (await this.checkPassword(user, password))) {

      return this.generateToken(user);
    } else {
      // TODO: Throw custom exception.
      throw new BadRequestException('User does not exist.');
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
        // TODO: Throw custom exception.
        throw new ConflictException('The credentials are already used.');
      } else {
        // Unknown error.
        // TODO: Throw custom exception.
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
