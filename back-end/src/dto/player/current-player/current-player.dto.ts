import { Player, Language } from '@entity/player/player.entity';

export class CurrentPlayer {
  /** Unique name of the user. */
  private readonly username: string;

  /** Email address. */
  private readonly email: string;

  /** Language used by client. */
  private readonly language: Language;

  /** Creation date */
  private readonly createdAt: Date;

  constructor(player: Player) {
    this.username = player.username;
    this.email = player.email;
    this.language = player.language;
    this.createdAt = player.createdAt;
  }
}
