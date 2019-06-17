import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Contracts.
import BASE_CONTRACT from '../../contract/base.contract';
import CONTRACT from '../../contract/alterations/penalties.contract';

/**
 * Activated bonus in a {@link Contest}.
 */
@Entity()
export class Penalties {

  /** Auto-generated ID. */
  @PrimaryGeneratedColumn({ name: BASE_CONTRACT.ID })
  id: number;

  /** Decreases the number of bombs. */
  @Column('boolean', { name: CONTRACT.BOMB_DOWN })
  bombDown: boolean;

  /** Decreases the range of the bombs. */
  @Column('boolean', { name: CONTRACT.BLUE_FLAME })
  blueFlame: boolean;

  /** Decreases the speed. */
  @Column('boolean', { name: CONTRACT.CLOG })
  clog: boolean;

  /** Set of diseases. */
  @Column('boolean', { name: CONTRACT.SKULL })
  skull: boolean;
}
