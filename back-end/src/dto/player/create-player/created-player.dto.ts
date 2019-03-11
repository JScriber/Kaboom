import { Player } from '@entity/player/player.entity';

export class CreatedPlayer {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly token: string;
  readonly createdAt: Date;

  constructor(player: Player) {
    this.id = player.id;
    this.username = player.username;
    this.email = player.email;
    this.token = player.token;
    this.createdAt = player.createdAt;
  }
}
