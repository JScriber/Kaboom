import { Inject } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
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

@WebSocketGateway(environment.ports.ws, { path: '/contest' })
export class ContestGateway extends Gateway {

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
      this.joinContest(socket, participant);
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
  private joinContest(socket: Socket, participant: Participant) {

    const contest = participant.contest;
    const waitingRoom = this.getWaitingRoom(contest);

    // Enter the room.
    this.participantService.connect(participant);
    socket.join(waitingRoom);

    // Notice everyone.
    this.sendContestState(contest);

    // Check if the game is ready.
    if (this.contestService.isReady(contest)) {
      const gamingRoom = this.getGameRoom(contest);

      this.emit(gamingRoom, {});
    }
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
   * Finds the gaming room for the contest.
   * @param contest
   * @returns the room identifier.
   */
  private getGameRoom(contest: Contest): string {
    return 'game/' + contest.uuid;
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
