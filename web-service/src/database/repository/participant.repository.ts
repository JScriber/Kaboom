import { Repository, EntityRepository } from 'typeorm';

// Entities.
import { Participant } from '@entity/participant.entity';

/**
 * Repository to manipulate {@link Participant} entities.
 */
@EntityRepository(Participant)
export class ParticipantRepository extends Repository<Participant> {

  /**
   * Finds a {@link Participant} by his UUID.
   * @returns {Promise<Participant>}
   */
  findByUUID(uuid: string): Promise<Participant> {

    return this.createQueryBuilder('participant')

      // Full load the contest.
      .innerJoinAndSelect('participant.contest', 'contest')
      .innerJoinAndSelect('contest.participants', 'participants')
      .innerJoinAndSelect('contest.map', 'map')
      .innerJoinAndSelect('contest.bonus', 'bonus')
      .innerJoinAndSelect('contest.penalties', 'penalties')

      .where('participant.uuid = :uuid', { uuid })
      .getOne();
  }
}
