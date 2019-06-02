import { User, Language } from '@entity/user.entity';

export class CurrentUser {

  /** Unique name of the user. */
  private readonly username: string;

  /** Email address. */
  private readonly email: string;

  /** Language used by client. */
  private readonly language: Language;

  /** Creation date */
  private readonly createdAt: Date;

  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.language = user.language;
    this.createdAt = user.createdAt;
  }
}
