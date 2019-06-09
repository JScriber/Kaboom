import { Controller, Get, Post, Res, Body, ValidationPipe, UseGuards, Req, Put, Inject } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express-serve-static-core';

import { CurrentUser, UpdateUser, UpdatePassword, DeleteUser, CreatedUser, Credentials, CreateUser } from '@model/user';

import { IUserService } from '@service/user/user.service.model';
import { WaitingStorageService } from '../../storage/waiting-storage/waiting-storage.service';

// Current user actions.
const CURRENT_USER_ROUTE = '@me';

@ApiUseTags('User')
@Controller('user')
export class UserController {

  constructor(
    @Inject('IUserService') private readonly service: IUserService,
    private readonly storage: WaitingStorageService) {}

  @Get('/test')
  hello() {
    this.storage.test();
  }

  /**
   * Informations on the current {@link User}.
   */
  @Get(CURRENT_USER_ROUTE)
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async current(@Req() request): Promise<CurrentUser> {
    return new CurrentUser(request.user);
  }

  /**
   * Updates informations on the current {@link User}.
   */
  @Put(CURRENT_USER_ROUTE)
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async update(@Req() request, @Body(new ValidationPipe()) informations: UpdateUser) {

    return new CreatedUser(
      await this.service.update(request.user, informations)
    );
  }

  /**
   * Updates the password of the given user.
   */
  @Put(`${CURRENT_USER_ROUTE}/password`)
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async updatePassword(@Req() request, @Body(new ValidationPipe()) passwords: UpdatePassword) {

    return new CreatedUser(
      await this.service.updatePassword(request.user, passwords)
    );
  }

  /**
   * Deletion of the current user.
   * Usage of post as delete cannot have a payload.
   */
  @Post(`${CURRENT_USER_ROUTE}/delete`)
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async delete(@Req() request, @Body(new ValidationPipe()) { password }: DeleteUser) {

    return this.service.delete(request.user, password);
  }

  /**
   * Logins the {@link User} if the credentials are correct.
   */
  @Post('login')
  async login(@Body(new ValidationPipe()) credentials: Credentials) {

    return this.service.login(credentials);
  }

  /**
   * Creates a new {@link User}.
   */
  @Post()
  async signup(@Body(new ValidationPipe()) informations: CreateUser) {
    
    return this.service.signUp(informations);
  }
}
