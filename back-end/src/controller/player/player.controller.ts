import { Controller, Get, Post, Res, Body, ValidationPipe, Delete, HttpStatus, ConflictException, InternalServerErrorException, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { Response } from 'express-serve-static-core';

// Encryption purposes.
import * as Bcrypt from 'bcrypt';

import { environment } from '@environment';
import { PlayerRepository } from '@repository/player/player.repository';
import { Player } from '@entity/player/player.entity';
import { TokenService } from '@service/token/token.service';

// Inputs and outputs.
import * as PlayerDTO from '@dto/player/index';

@ApiUseTags('Player')
@Controller('player')
export class PlayerController {

  constructor(
    @InjectRepository(PlayerRepository)
    private readonly playerRepository: PlayerRepository,
    private readonly tokenService: TokenService) {}

  /** Informations on the current user. */
  @Get('self/info')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async current(@Req() request): Promise<PlayerDTO.CurrentPlayer> {
    return new PlayerDTO.CurrentPlayer(request.player);
  }

  /** Deletion of the current user. */
  @Delete('self/delete')
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
        player.token = this.tokenService.generateFrom({
          id: player.id,
          uuid: player.uuid,
          username: player.username
        });

        if (player.token !== null) {
          // Updates the user to store the token.
          this.playerRepository.save(player).then(() => {
            res.status(HttpStatus.OK).send(player.token);
          });
        }
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

    // Set the salt.
    player.salt = await Bcrypt.genSalt(environment.security.roundEncryption);
    // Encrypt password.
    player.password = await Bcrypt.hash(info.password, player.salt);

    // Persist the user.
    try {
      res.status(HttpStatus.CREATED).send(
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
}
