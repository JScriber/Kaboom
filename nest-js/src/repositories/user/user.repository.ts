import { EntityRepository, Repository } from "typeorm";
import { User } from '@entity/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /**
   * Finds all the contests at which the user has participated.
   * @param {number} id - User id.
   * @returns {Promise<number[]>}
   */
  async findContests(id: number): Promise<number[]> {
    return (
      await this.createQueryBuilder('user')
      .select('participant.contest_id', 'id')
      .leftJoin('user.participations', 'participant')
      .where('user.id = :id', { id })
      .getRawMany()
    ).map(r => <number>r.id);
  }  
}
