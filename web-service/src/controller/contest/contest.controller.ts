import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Inject, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { IContestService } from '@service/contest/contest.service.model';
import { ContestForm, ContestJoin } from '@model/contest';

@ApiUseTags('Contest')
@Controller('contest')
export class ContestController {

  constructor(
    @Inject('IContestService') private readonly service: IContestService) {}

  /**
   * Lists all opened {@link Contest}.
   */
  @Get()
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async list() {

    return this.service.list();
  }

  /**
   * Creates a new {@link Contest}.
   */
  @Post('create')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async create(@Req() request, @Body(new ValidationPipe()) form: ContestForm) {

    return this.service.create(request.user, form);
  }

  /**
   * Joins an existing {@link Contest}.
   */
  @Post('join')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async join(@Req() request, @Body(new ValidationPipe()) { uuid }: ContestJoin) {

    return this.service.join(uuid, request.user);
  }
}
