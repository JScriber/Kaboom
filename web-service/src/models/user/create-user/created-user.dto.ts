import { User, Language } from '@entity/user.entity';

export class CreatedUser {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly language: Language;
  readonly createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.language = user.language;
    this.createdAt = user.createdAt;
  }
}
