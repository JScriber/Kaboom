import { Controller, Get, Post, Res, Body, ValidationPipe, Delete, HttpStatus, ConflictException, InternalServerErrorException, BadRequestException, UseGuards, Req, Put, UnauthorizedException, HttpCode } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { Response } from 'express-serve-static-core';

// Encryption purposes.
import * as Bcrypt from 'bcrypt';

import { environment } from '@environment';
import { PlayerRepository } from '@repository/player/player.repository';
import { Player, Language } from '@entity/player/player.entity';
import { TokenService } from '@service/token/token.service';

// Inputs and outputs.
import * as PlayerDTO from '@dto/player/index';

/** Default language. */
const DEFAULT_LANGUAGE = Language.English;

@ApiUseTags('Player')
@Controller('player')
export class PlayerController {

  constructor(
    @InjectRepository(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
    private readonly tokenService: TokenService) {}

  /** Informations on the current user. */
  @Get('@me')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async current(@Req() request): Promise<PlayerDTO.CurrentPlayer> {
    return new PlayerDTO.CurrentPlayer(request.player);
  }

  /** Updates informations on the current user. */
  @Put('@me')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async update(@Res() res, @Req() request, @Body(new ValidationPipe()) patch: PlayerDTO.UpdatePlayer) {
    const player: Player = request.player;

    // Patches informations.
    player.username = patch.username;
    player.email = patch.email;
    player.language = patch.language || DEFAULT_LANGUAGE;

    try {
      res.status(HttpStatus.OK).send(
        new PlayerDTO.CreatedPlayer(
          await this.playerRepository.save(player)
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
  async updatePassword(@Res() res, @Req() request, @Body(new ValidationPipe()) dto: PlayerDTO.UpdatePassword) {
    const player: Player = request.player;

    const goodPassword: boolean = await this.passwordMatch(dto.oldPassword, player);

    if (goodPassword) {
      player.password = await Bcrypt.hash(dto.newPassword, player.salt);

      try {
        await this.playerRepository.save(player);

        res.status(HttpStatus.OK).send({
          message: 'Password updated!'
        });
      } catch (error) {
        throw new InternalServerErrorException('Couldn\'t update the password.');
      }
    } else {
      throw new BadRequestException('Wrong password.');
    }
  }

  /** Deletion of the current user. */
  @Delete('@me')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async delete(@Req() request) {
    // TODO: Ask for password to insist on deletion.
    const player: Player = request.player;
    const result: DeleteResult = await this.playerRepository.delete(player.id);

    if (result.affected === 0) {
      throw new InternalServerErrorException('Couldn\'t delete current user');
    }

    return 'Successfully deleted.';
  }

  @Post('login')
  async login(@Res() res: Response, @Body(new ValidationPipe()) credentials: PlayerDTO.Credentials) {
    // Message returned if incorrect credentials.
    const incorrectCredentials: string = 'Incorrect credentials.';

    try {
      // Get the requested player.
      const player: Player = await this.playerRepository.findOne({
        username: credentials.username
      });

      if (await this.passwordMatch(credentials.password, player)) {
        // Generate and assign a token.
        const token = this.generateToken(player);

        res.status(HttpStatus.OK).send(
          new PlayerDTO.NewCredentials(player, token)
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
  async signup(@Res() res: Response, @Body(new ValidationPipe()) info: PlayerDTO.CreatePlayer) {
    const player = new Player();

    // Set basic informations.
    player.username = info.username;
    player.email = info.email;
    player.language = info.language || DEFAULT_LANGUAGE;

    // Set the salt.
    player.salt = await Bcrypt.genSalt(environment.security.roundEncryption);
    // Encrypt password.
    player.password = await Bcrypt.hash(info.password, player.salt);

    // Persist the user.
    try {
      const savedPlayer = await this.playerRepository.save(player);
      const createdPlayer = new PlayerDTO.CreatedPlayer(savedPlayer);
      createdPlayer.token = this.generateToken(savedPlayer); 

      res.status(HttpStatus.CREATED).send(createdPlayer);
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
   * @param {Player} player
   * @returns {Promise<boolean>}
   */
  private async passwordMatch(testedPassword: string, player: Player): Promise<boolean> {
    return player.password === await Bcrypt.hash(testedPassword, player.salt);
  }

  /**
   * Generates a token from the given player.
   * @param {Player} player
   * @returns {string}
   */
  private generateToken(player: Player): string {
    return this.tokenService.generateFrom({
      id: player.id,
      uuid: player.uuid
    });
  }
}
