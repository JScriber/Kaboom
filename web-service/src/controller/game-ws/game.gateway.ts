import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { Gateway } from '../../utils/gateway';
import { RunningContest } from 'src/redis/entities/running-contest.entity';
import { Player } from '../../redis/entities/player.entity';

// Services.
import { TokenRunningContestService } from '../../services/game/token-running-contest/token-running-contest.service';

@WebSocketGateway({ namespace: 'play' })
export class GameGateway extends Gateway  {

  constructor(private readonly tokenService: TokenRunningContestService) {
    super();
  }

  /**
   * Authentification at connection time.
   */
  async handleConnection(socket: Socket) {

    const data = await this.getContestFromSocket(socket);

    if (data) {
      this.joinContestRoom(socket, data[0]);
    } else {
      socket.disconnect();
    }
  }

  @SubscribeMessage('push')
  onPush(client, data) {
    console.log('Puuush', data);
    return {
      event: 'pop',
      data,
    };
  }

  /**
   * Check disconnection of players.
   */
  async handleDisconnect(socket: Socket) {
    
  }

  private joinContestRoom(socket: Socket, contest: RunningContest) {
    console.log('A player has join the contest ' + contest.id);

    socket.join(`feed/${contest.id}`);
  }

  /**
   * Gets the {@link RunningContest} from the socket.
   * @param {Socket} socket
   */
  private async getContestFromSocket(socket: Socket): Promise<[RunningContest, Player]> {
    const { token } = socket.handshake.query;
    let contest: [RunningContest, Player];

    if (token) {
      try {
        contest = await this.tokenService.extractFromToken(token);
      } catch (e) {}
    }

    return contest;
  }
}
