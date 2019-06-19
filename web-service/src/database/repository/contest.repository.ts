import { Repository, EntityRepository, DeleteResult } from 'typeorm';

// Entities.
import { Contest } from '@entity/contest.entity';
import { Participant } from '@entity/participant.entity';

// Contracts.
import PARTICIPANT_CONTRACT from '../contract/participant.contract';

/**
 * Repository to manipulate {@link Contest} entities.
 */
@EntityRepository(Contest)
export class ContestRepository extends Repository<Contest> {

  /**
   * Finds a {@link Contest} by its UUID.
   * @param uuid
   * @returns {Promise<Contest[]>}
   */
  findByUUID(uuid: string): Promise<Contest> {

    return this.createQueryBuilder('contest')

      .innerJoinAndSelect('contest.map', 'map')

      .leftJoinAndSelect('contest.bonus', 'bonus')
      .leftJoinAndSelect('contest.penalties', 'penalties')

      .leftJoinAndSelect('contest.participants', 'participants', 'participants.connected = TRUE')
      .leftJoinAndSelect('participants.user', 'user')

      .where('contest.uuid = :uuid', { uuid })

      .getOne();
  }

  /**
   * Finds all the available contests.
   * The connected {@link Participant participants} are attached.
   * @returns {Promise<Contest[]>}
   */
  findAvailable(): Promise<Contest[]> {

    return this.createQueryBuilder('contest')

      // Attach map and participants.
      .innerJoinAndSelect('contest.map', 'map')
      .leftJoinAndSelect('contest.participants', 'participants', 'participants.connected = TRUE')

      // Must have slots left.
      .where(qb => {
        const subQuery = qb.subQuery().select('COUNT(participant.id)')
          .from(Participant, 'participant')
          .where(`contest.id = ${PARTICIPANT_CONTRACT.CONTEST}`);

        return 'contest.maxParticipants > ' + subQuery.getQuery();
      })
      .getMany();
  }
}
