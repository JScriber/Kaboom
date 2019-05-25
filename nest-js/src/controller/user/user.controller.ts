import { Controller, Get, Post, Res, Body, ValidationPipe, Delete, HttpStatus, ConflictException, InternalServerErrorException, BadRequestException, UseGuards, Req, Put, UnauthorizedException, HttpCode } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { Response } from 'express-serve-static-core';

// Encryption purposes.
import * as Bcrypt from 'bcrypt';

import { environment } from '@environment';
import { UserRepository } from '@repository/user/user.repository';
import { User, Language } from '@entity/user/user.entity';
import { TokenService } from '@service/token/token.service';

// Inputs and outputs.
import * as UserDTO from '@dto/user/index';

/** Default language. */
const DEFAULT_LANGUAGE = Language.English;

@ApiUseTags('User')
@Controller('user')
export class UserController {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService) {}

  /** Informations on the current user. */
  @Get('@me')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async current(@Req() request): Promise<UserDTO.CurrentUser> {
    return new UserDTO.CurrentUser(request.user);
  }

  /** Updates informations on the current user. */
  @Put('@me')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async update(@Res() res, @Req() request, @Body(new ValidationPipe()) patch: UserDTO.UpdateUser) {
    const user: User = request.user;

    // Patches informations.
    user.username = patch.username;
    user.email = patch.email;
    user.language = patch.language || DEFAULT_LANGUAGE;

    try {
      res.status(HttpStatus.OK).send(
        new UserDTO.CreatedUser(
          await this.userRepository.save(user)
        )
      );
    } catch (error) {
       // Credentials already used.
       if (error.code === '23505') {
        throw new ConflictException('The credentials are already used.');
      } else {
        // Unknown error.
        throw new InternalServerErrorException('Cannot update the current user.');
      }
    }
  }

  /** Updates the password of the given user. */
  @Put('@me/password')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async updatePassword(@Res() res, @Req() request, @Body(new ValidationPipe()) dto: UserDTO.UpdatePassword) {
    const user: User = request.user;

    const goodPassword: boolean = await this.passwordMatch(dto.oldPassword, user);

    if (goodPassword) {
      user.password = await Bcrypt.hash(dto.newPassword, user.salt);

      try {
        await this.userRepository.save(user);

        res.status(HttpStatus.OK).send({
          message: 'Password updated!'
        });
      } catch (error) {
        throw new InternalServerErrorException('Couldn\'t update the password.');
      }
    } else {
      throw new BadRequestException('Incorrect password.');
    }
  }

  /**
   * Deletion of the current user.
   * Usage of post as delete cannot have a payload.
   */
  @Post('@me/delete')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async delete(@Res() res, @Req() request, @Body(new ValidationPipe()) dto: UserDTO.DeleteUser) {
    const user: User = request.user;

    if (await this.passwordMatch(dto.password, user)) {
      const result: DeleteResult = await this.userRepository.delete(user.id);
  
      if (result.affected === 0) {
        throw new InternalServerErrorException('Couldn\'t delete current user');
      } else {
        res.status(HttpStatus.OK).send({
          message: 'User deleted'
        });
      }
    } else {
      throw new BadRequestException('Incorrect password');
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body(new ValidationPipe()) credentials: UserDTO.Credentials) {
    // Message returned if incorrect credentials.
    const incorrectCredentials: string = 'Incorrect credentials.';

    try {
      // Get the requested user.
      const user: User = await this.userRepository.findOne({
        username: credentials.username
      });

      if (await this.passwordMatch(credentials.password, user)) {
        // Generate and assign a token.
        const token = this.generateToken(user);

        res.status(HttpStatus.OK).send(
          new UserDTO.NewCredentials(user, token)
        );
      } else {
        throw new BadRequestException(incorrectCredentials);
      }
    } catch (e) {
      throw new BadRequestException(incorrectCredentials);
    }
  }

  /** Creates a new user. */
  @Post()
  async signup(@Res() res: Response, @Body(new ValidationPipe()) info: UserDTO.CreateUser) {
    const user = new User();

    // Set basic informations.
    user.username = info.username;
    user.email = info.email;
    user.language = info.language || DEFAULT_LANGUAGE;

    // Set the salt.
    user.salt = await Bcrypt.genSalt(environment.security.roundEncryption);
    // Encrypt password.
    user.password = await Bcrypt.hash(info.password, user.salt);

    // Persist the user.
    try {
      const savedUser = await this.userRepository.save(user);
      const createdUser = new UserDTO.CreatedUser(savedUser);
      createdUser.token = this.generateToken(savedUser); 

      res.status(HttpStatus.CREATED).send(createdUser);
    } catch (error) {
      // Credentials already used.
      if (error.code === '23505') {
        throw new ConflictException('The credentials are already used.');
      } else {
        // Unknown error.
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Says if the given password is the good password.
   * @param {string} testedPassword - Password to test.
   * @param {User} user
   * @returns {Promise<boolean>}
   */
  private async passwordMatch(testedPassword: string, user: User): Promise<boolean> {
    return user.password === await Bcrypt.hash(testedPassword, user.salt);
  }

  /**
   * Generates a token from the given player.
   * @param {User} user
   * @returns {string}
   */
  private generateToken({ id, uuid }: User): string {
    return this.tokenService.generateFrom({ id, uuid });
  }
}
