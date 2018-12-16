import { Controller, Get, Post, Res, Body, ValidationPipe, UseGuards, Req, HttpStatus, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { Response } from 'express-serve-static-core';

import { Contest } from '../../entities/contest/contest.entity';
import { Player } from '../../entities/player/player.entity';
import { ContestDTO } from '../../dto/contest/contest-settings.dto';
import { PoolWebSocket } from '../../websockets/pool/pool.websocket';
import { Map } from 'src/entities/map/map.entity';
import { Participant } from '../../entities/participant/participant.entity';
import { TokenService } from '../../services/token/token.service';

@ApiUseTags('Contest')
@Controller('contest')
export class ContestController {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    @InjectRepository(Map)
    private readonly mapRepository: Repository<Map>,
    private readonly tokenService: TokenService,
    private readonly contestWS: PoolWebSocket) {}

  @Get()
  getAll(): Promise<Contest[]> {
    return this.contestRepository.find();
  }

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async create(@Req() request, @Res() res: Response, @Body(new ValidationPipe()) settings: ContestDTO.ContestSettings) {
    // Current user.
    const player: Player = request.player;
    const contest: Contest = new Contest();

    // Try to retrieved the map used in the contest.
    try {
      const map: Map = await this.mapRepository.findOneOrFail({
        where: {
          id: settings.mapID,
          owner: player
        }
      });

      // Attach the map to the contest.
      contest.map = map;
    } catch (error) {
      throw new BadRequestException(`Map with id ${settings.mapID} doesn't exist or is not owned by ${player.username}.`);
    }

    // Attach the participant.
    const participant = this.newParticipant(player, true);
    const token: string = participant.token;
    contest.participants = [participant];

    // TODO: Change.
    contest.bonusActived = true;
    contest.penaltiesActivated = true;

    try {
      await this.contestRepository.save(contest);

      res.status(HttpStatus.CREATED).send({ token });
    } catch(error) {
      console.log(error);
      throw new InternalServerErrorException('Error while creating the contest.');
    }
  }

  /**
   * Creates a new participation with a given player.
   * @param {Player} player
   * @param {boolean} isCreator
   * @returns {Participant}
   */
  private newParticipant(player: Player, isCreator: boolean): Participant {
    const participant: Participant = new Participant();
    participant.creator = isCreator;
    participant.player = player;

    return participant;
  }
}
