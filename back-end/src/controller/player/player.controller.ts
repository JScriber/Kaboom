import { Controller, Get, Post, Res, Body, ValidationPipe, Delete, Param, ParseIntPipe, HttpException, HttpStatus, Bind } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DeleteResult, Repository } from 'typeorm';
import { Response } from 'express-serve-static-core';

// Encryption purposes.
import * as Bcrypt from 'bcrypt';

import { Player } from '../../entities/player/player.entity';
import { CreatePlayerInDto } from '../../dto/player/create-player/player-in.dto';
import { environment } from '../../../environment';
import { CreatePlayerOutDto } from 'src/dto/player/create-player/player-out.dto';
import { IdentifiersInDto } from 'src/dto/player/identifiers/identifiers-in.dto';
import { TokenService } from '../../services/token/token.service';

@Controller('player')
export class PlayerController {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly tokenService: TokenService) {}  

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Player> {
    const user = await this.playerRepository.findOne(id);

    if (user === undefined)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    return user;
  }

  @Post('login')
  async login(@Res() res: Response, @Body(new ValidationPipe()) identifiers: IdentifiersInDto) {
    try {
      // Get the requested player.
      const player: Player = await this.playerRepository.findOne({
        username: identifiers.username
      });

      // Tested password.
      const password: string = await Bcrypt.hash(identifiers.password, player.salt);
      if (password === player.password) {
        // Generate and assign a token.
        player.token = await this.tokenService.generate(player);

        if (player.token !== null) {
          // Updates the user to store the token.
          this.playerRepository.save(player).then(() => {
            res.status(HttpStatus.OK).send(player.token);
          });
        }
      } else {
        // Bad password exception.
        // TODO: Better error handling.
        res.status(HttpStatus.UNAUTHORIZED).send({
          message: 'Bad password'
        });
      }
    } catch (erro) {
      res.status(HttpStatus.NOT_FOUND).send({
        message: 'The user doesn\'t exist.'
      });
    }
  }

  @Post()
  async signup(@Res() res: Response, @Body(new ValidationPipe()) playerIn: CreatePlayerInDto) {
    const player = new Player();

    // Set basic informations.
    player.username = playerIn.username;
    player.email = playerIn.email;
    player.createdAt = new Date();

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
      // TODO: Better error handling.
      res.status(HttpStatus.NOT_FOUND).send({
        error: error.message
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const result: DeleteResult = await this.playerRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Couldn\'t delete the user', HttpStatus.BAD_REQUEST);
    }
  }
}
