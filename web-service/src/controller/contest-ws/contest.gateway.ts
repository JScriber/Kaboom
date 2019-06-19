import { Inject } from '@nestjs/common';
import { WebSocketGateway, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { Gateway } from '../../utils/gateway';

import { environment } from '@environment';

// Services.
import { IParticipantService } from '@service/participant/participant.service.model';
import { IContestService } from '@service/contest/contest.service.model';

// Entities.
import { Participant } from '@entity/participant.entity';
import { Contest } from '@entity/contest.entity';

// DTO.
import { ContestWait } from '@model/contest';

export const START_GAME_ROOM = 'start';

@WebSocketGateway(environment.ports.ws, { path: '/contest' })
export class ContestGateway extends Gateway  {

  constructor(
    @Inject('IContestService') private readonly contestService: IContestService,
    @Inject('IParticipantService') private readonly participantService: IParticipantService) {

    super();
  }

  /**
   * Authentification at connection time.
   */
  async handleConnection(socket: Socket) {
    const participant = await this.getParticipantFromSocket(socket);

    if (participant) {
      console.log('CONNECTED', socket.client.id);
      await this.joinContest(socket, participant);
    } else {
      socket.disconnect();
    }
  }

  /**
   * Check disconnection of players.
   */
  async handleDisconnect(socket: Socket) {
    const participant = await this.getParticipantFromSocket(socket);
    
    if (participant) {
      const { uuid } = participant.contest;

      await this.contestService.leave(participant);

      const contest = await this.contestService.getOne(uuid);

      if (contest) {
        this.sendContestState(contest);
      } else {
        this.disconnectAll(this.getWaitingRoom({ uuid }));
      }
    }
  }

  /**
   * Join a {@link Contest}.
   * @param socket
   * @param participant
   */
  private async joinContest(socket: Socket, participant: Participant) {

    const { uuid } = participant.contest;
    const waitingRoom = this.getWaitingRoom({ uuid });

    // Enter the room.
    await this.participantService.connect(participant);
    socket.join(waitingRoom);

    // Find the contest.
    const contest = await this.contestService.getOne(uuid);

    // Notice everyone.
    this.sendContestState(contest);

    // Check if the game is ready.
    if (this.contestService.isReady(contest)) {
      this.startContest(contest);
    }
  }

  /**
   * Starts the contest.
   * @param contest
   */
  private startContest(contest: Contest) {

    const waitingRoom = this.getWaitingRoom(contest);

    // TODO: Migrate contest to cache.

    this.socketsInRoom(waitingRoom).subscribe(sockets => sockets.forEach(socket => {
      // TODO: Generate a new token based on the REDIS informations.
      socket.emit(START_GAME_ROOM);
      socket.disconnect();
    }));
  }

  /**
   * Sends the state of the given {@link Contest} to everyone in the room.
   * @param {Contest} contest
   */
  private sendContestState(contest: Contest) {
    const waitingRoom = this.getWaitingRoom(contest);

    this.emit(waitingRoom, new ContestWait(contest));
  }

  /**
   * Finds the waiting room for the contest.
   * @param contest
   * @returns the room identifier.
   */
  private getWaitingRoom({ uuid }): string {
    return 'waiting/' + uuid;
  }

  /**
   * Extracts the participant from the socket.
   * @param {Socket} socket
   * @returns {Promise<Participant | undefined>}
   */
  private async getParticipantFromSocket({ handshake }: Socket): Promise<Participant | undefined> {
    const token: string | undefined = handshake.query.token;
    let participant: Participant;
  
    if (token) {
      try {
        participant = await this.participantService.getFromToken(token);
      } catch (e) {}
    }
  
    return participant;
  }
}
