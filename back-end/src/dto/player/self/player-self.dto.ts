import { Player } from '../../../entities/player/player.entity';

export class PlayerSelfDto {
  /** Unique name of the user. */
  private readonly username: string;

  /** Email address. */
  private readonly email: string;

  /** Creation date */
  private readonly createdAt: Date;

  constructor(player: Player) {
    this.username = player.username;
    this.email = player.email;
    this.createdAt = player.createdAt;
  }
}