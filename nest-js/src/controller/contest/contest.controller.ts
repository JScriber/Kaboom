import { Controller, Post, Res, Body, ValidationPipe, UseGuards, Req, HttpStatus, InternalServerErrorException, BadRequestException, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { Response } from 'express-serve-static-core';

// Entities.
import { Contest } from '@entity/contest/contest.entity';
import { User } from '@entity/user/user.entity';
import { Participant } from '@entity/participant/participant.entity';
import { Map } from '@entity/map/map.entity';

import { UserRepository } from '@repository/user/user.repository';
import { ContestDTO } from '@dto/contest/contest-settings.dto';
import { PoolWebSocket } from '../../websockets/pool/pool.websocket';

@ApiUseTags('Contest')
@Controller('contest')
export class ContestController {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    @InjectRepository(Map)
    private readonly mapRepository: Repository<Map>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(UserRepository)
    private readonly playerRepository: UserRepository,
    private readonly contestWS: PoolWebSocket) {}

  @Post('create')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async create(@Req() request, @Res() res: Response, @Body(new ValidationPipe()) settings: ContestDTO.ContestSettings) {
    // Current user.
    const user: User = request.user;
    const contest: Contest = new Contest();

    // Try to retrieved the map used in the contest.
    try {
      const map: Map = await this.mapRepository.findOneOrFail({
        where: {
          id: settings.mapID,
          owner: user
        }
      });

      // Attach the map to the contest.
      contest.map = map;
    } catch (error) {
      throw new BadRequestException(`Map with id ${settings.mapID} doesn't exist or is not owned by ${user.username}.`);
    }

    // Attach the participant.
    let participant: Participant;

    try {
      participant = await this.newParticipant(user, true);
    } catch (error) {
      throw new InternalServerErrorException('Cannot create a participation.');
    }

    contest.participants = [participant];
    // TODO: Change.
    contest.bonusActived = true;
    contest.penaltiesActivated = true;

    try {
      const newContest: Contest = await this.contestRepository.save(contest);

      res.status(HttpStatus.CREATED).send({
        id: newContest.id,
        reference: participant.uuid
      });
    } catch(error) {
      // Delete the participant.
      this.participantRepository.delete(participant);
      throw new InternalServerErrorException('Error while creating the contest.');
    }
  }

  @Post('join')
  @UseGuards(AuthGuard('bearer'))
  @ApiBearerAuth()
  async join(@Req() request, @Res() res: Response, @Body(new ValidationPipe()) input: ContestDTO.ContestJoin) {
    const id: number = input.id;
    const user: User = request.user;
    let contest: Contest;

    // Check if the contest exists.
    try {
      contest = await this.contestRepository.findOneOrFail({
        relations: ['participants'],
        where: { id }
      });
    } catch (err) {
      throw new BadRequestException(`Contest with id ${id} doesn't exist.`);
    }

    // Get all the contests the user has been participating to.
    const contests: number[] = await this.playerRepository
      .findContests(user.id);

    if (contests.indexOf(id) === -1) {
      let participant: Participant;

      // Check if the participant has been fully created.
      try {
        participant = await this.newParticipant(user, false);
      } catch (err) {
        throw new InternalServerErrorException('Cannot create the participant.');
      }

      // Add the participant to the contest.
      contest.participants.push(participant);

      // Try to save the contest.
      this.contestRepository.save(contest).then((contest) => {
        // Notice the other players.
        this.contestWS.playerJoined();

        // Notice the current player.
        res.status(HttpStatus.CREATED).send({
          id: contest.id,
          players: contest.participants.length,
          reference: participant.uuid
        });
      }).catch(() => {
        // Delete the orphan.
        this.participantRepository.delete(participant);
        throw new InternalServerErrorException('Error while joining the contest');
      });
    } else {
      throw new BadRequestException('User is already participating.');
    }
  }

  /**
   * Creates a new participation with a given user.
   * @param {User} user
   * @param {boolean} isCreator
   * @returns {Participant}
   */
  private async newParticipant(user: User, isCreator: boolean): Promise<Participant> {
    const participant: Participant = new Participant();
    participant.creator = isCreator;
    participant.user = user;

    return this.participantRepository.save(participant);
  }
}