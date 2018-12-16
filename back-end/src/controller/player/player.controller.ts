import { Controller, Get, Post, Res, Body, ValidationPipe, Delete, HttpStatus, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, Repository } from 'typeorm';
import { Response } from 'express-serve-static-core';

// Encryption purposes.
import * as Bcrypt from 'bcrypt';

import { Player } from '../../entities/player/player.entity';
import { CreatePlayerInDto } from '../../dto/player/create-player/player-in.dto';
import { PlayerSelfDto } from '../../dto/player/self/player-self.dto';
import { environment } from '../../../environment';
import { CreatePlayerOutDto } from 'src/dto/player/create-player/player-out.dto';
import { IdentifiersInDto } from 'src/dto/player/identifiers/identifiers-in.dto';
import { TokenService } from '../../services/token/token.service';
import { Validator } from '../../utils/validator/validator';

@ApiUseTags('Player')
@Controller('player')
export class PlayerController {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly tokenService: TokenService) {}  

  /** Informations on the current user. */
  @Get('self/info')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async current(@Req() request): Promise<PlayerSelfDto> {
    return new PlayerSelfDto(request.player);
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
  async login(@Res() res: Response, @Body(new ValidationPipe()) credentials: IdentifiersInDto) {
    // Message returned if incorrect credentials.
    const incorrectCredentials: string = 'Incorrect credentials.';

    try {
      // Get the requested player.
      const player: Player = await this.playerRepository.findOne({
        username: credentials.username
      });

      if (await this.passwordMatch(credentials.password, player)) {
        // Generate and assign a token.
        player.token = this.tokenService.generate(player);

        if (player.token !== null) {
          // Updates the user to store the token.
          this.playerRepository.save(player).then(() => {
            res.status(HttpStatus.OK).send(player.token);
          });
        }
      } else {
        throw new NotFoundException(incorrectCredentials);
      }
    } catch (e) {
      throw new NotFoundException(incorrectCredentials);
    }
  }

  /** Creates a new user. */
  @Post()
  async signup(@Res() res: Response, @Body(new ValidationPipe()) playerIn: CreatePlayerInDto) {
    if (Validator.test(playerIn.password, Validator.MEDIUM_PASSWORD) &&
        Validator.test(playerIn.email, Validator.EMAIL)) {

      const player = new Player();
  
      // Set basic informations.
      player.username = playerIn.username;
      player.email = playerIn.email;
  
      // Set the salt.
      player.salt = await Bcrypt.genSalt(environment.security.roundEncryption);
      // Encrypt password.
      player.password = await Bcrypt.hash(playerIn.password, player.salt);
  
      // Persist the user.
      try {
        res.status(HttpStatus.CREATED).send(
          new CreatePlayerOutDto(
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
    } else {
      throw new BadRequestException('You must enter an email address and a strong password.');
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
