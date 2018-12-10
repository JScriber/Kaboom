import { Player } from '../../../entities/player/player.entity';

export class CreatePlayerOutDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly createdAt: Date;

  constructor(player: Player) {
    this.id = player.id;
    this.username = player.username;
    this.email = player.email;
    this.createdAt = player.createdAt;
  }
}
