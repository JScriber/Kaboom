import { UpdateUser, UpdatePassword, Credentials, CreateUser, Token } from '@model/user';
import { User } from '@entity/user/user.entity';

export interface IUserService {

  /**
   * Updates the {@link User} with the given informations.
   * @param user
   * @param informations
   * @returns the updated user.
   */
  update(user: User, informations: UpdateUser): Promise<User>;

  /**
   * Updates the password of the {@link User}.
   * @param user
   * @param passwords
   * @returns the updated user.
   */
  updatePassword(user: User, passwords: UpdatePassword): Promise<User>;

  /**
   * Deletes the {@link User}.
   * @param user 
   * @param updatePassword - Password confirmation.
   * @returns TRUE or FALSE depending of the success.
   */
  delete(user: User, password: string): Promise<boolean>;

  /**
   * Logins the {@link User}.
   * @param credentials - Connection informations.
   * @returns an access token.
   */
  login(credentials: Credentials): Promise<Token>;

  /**
   * Creates a new {@link User}.
   * @param informations
   * @returns an access token.
   */
  signUp(informations: CreateUser): Promise<Token>;
}
