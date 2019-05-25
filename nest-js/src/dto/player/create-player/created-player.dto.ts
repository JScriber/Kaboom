import { Player, Language } from '@entity/player/player.entity';

export class CreatedPlayer {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly language: Language;
  readonly createdAt: Date;
  token: string;

  constructor(player: Player) {
    this.id = player.id;
    this.username = player.username;
    this.email = player.email;
    this.language = player.language;
    this.createdAt = player.createdAt;
  }
}
