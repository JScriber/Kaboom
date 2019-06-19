import { Inject } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { Gateway } from '../../utils/gateway';

// Services.
import { IParticipantService } from '@service/participant/participant.service.model';
import { IContestService } from '@service/contest/contest.service.model';
import { MigrateContestService } from '@service/game/migrate-contest/migrate-contest.service';
import { TokenRunningContestService } from '@service/game/token-running-contest/token-running-contest.service';

// Entities.
import { Participant } from '@entity/participant.entity';
import { Contest } from '@entity/contest.entity';

// DTO.
import { ContestWait } from '@model/contest';

export const START_GAME_ROOM = 'start';

@WebSocketGateway({ namespace: 'wait' })
export class ContestGateway extends Gateway  {

  constructor(
    @Inject('IContestService') private readonly contestService: IContestService,
    @Inject('IParticipantService') private readonly participantService: IParticipantService,
    private readonly migrateService: MigrateContestService,
    private readonly tokenService: TokenRunningContestService) {

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
        this.disconnectAll(this.getWaitingRoom(uuid));
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
    const waitingRoom = this.getWaitingRoom(uuid);

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
  private async startContest(contest: Contest) {

    const waitingRoom = this.getWaitingRoom(contest.uuid);

    // Migrate contest to cache.
    const runningContest = await this.migrateService.migrate(contest);
    const players = Array.from(runningContest.players);

    this.socketsInRoom(waitingRoom).subscribe(sockets => sockets.forEach(async (socket) => {

      const participant = await this.getParticipantFromSocket(socket);
      const player = players.find(p => p.participantId === participant.id);

      // Generate a new token based on the REDIS informations.
      const token = this.tokenService.createToken(runningContest, player);

      socket.emit(START_GAME_ROOM, { token });

      // Each player is disconnected. To play they must connect with the new token.
      // The contest is not deleted here as the creator is disconnected.
      socket.disconnect();
    }));
  }

  /**
   * Sends the state of the given {@link Contest} to everyone in the room.
   * @param {Contest} contest
   */
  private sendContestState(contest: Contest) {
    const waitingRoom = this.getWaitingRoom(contest.uuid);

    this.emit(waitingRoom, new ContestWait(contest));
  }

  /**
   * Finds the waiting room for the contest.
   * @param uuid
   * @returns the room identifier.
   */
  private getWaitingRoom(uuid): string {
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
