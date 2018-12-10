import { Player } from '../../../entities/player/player.entity';

export class ConnectedUserDto {
  /** Unique id of the user. */
  private readonly id: number;

  /** Unique name of the user. */
  private readonly username: string;

  /** Authentification token. */
  private readonly token: string;

  constructor(player: Player) {
    this.id = player.id;
    this.username = player.username;
    this.token = player.token;
  }
}