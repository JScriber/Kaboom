import { User } from '@entity/user/user.entity';

export class NewCredentials {

  /** Unique id of the user. */
  private readonly id: number;

  /** Unique name of the user. */
  private readonly username: string;

  /** Authentification token. */
  private readonly token: string;

  constructor(user: User, token: string) {
    this.id = user.id;
    this.username = user.username;
    this.token = token;
  }
}
