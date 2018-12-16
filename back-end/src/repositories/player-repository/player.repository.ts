import { EntityRepository, Repository } from "typeorm";
import { Player } from '../../entities/player/player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> {

  /**
   * Finds all the contests at which the player has participated.
   * @param {number} id - Player id.
   * @returns {Promise<number[]>}
   */
  async findContests(id: number): Promise<number[]> {
    return (
      await this.createQueryBuilder('player')
      .select('participant.contest_id', 'id')
      .leftJoin('player.participations', 'participant')
      .where('player.id = :id', { id })
      .getRawMany()
    ).map(r => <number>r.id);
  }  
}