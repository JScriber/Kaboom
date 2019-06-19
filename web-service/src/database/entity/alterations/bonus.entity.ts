import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Contracts.
import BASE_CONTRACT from '../../contract/base.contract';
import CONTRACT from '../../contract/alterations/bonus.contract';

/**
 * Activated bonus in a {@link Contest}.
 */
@Entity()
export class Bonus {

  /** Auto-generated ID. */
  @PrimaryGeneratedColumn({ name: BASE_CONTRACT.ID })
  id: number;

  /** Can go through the walls. */
  @Column('boolean', { name: CONTRACT.WALL_PASS })
  wallPass: boolean;

  /** Not impacted by fire. */
  @Column('boolean', { name: CONTRACT.FIRE_SUIT })
  fireSuit: boolean;

  /** More bombs. */
  @Column('boolean', { name: CONTRACT.BOMB_UP })
  bombUp: boolean;

  /** Increases speed. */
  @Column('boolean', { name: CONTRACT.SKATE })
  skate: boolean;

  /** Wider range for bombs. */
  @Column('boolean', { name: CONTRACT.YELLOW_FLAME })
  yellowFlame: boolean;

  /** Infinite range for bombs. */
  @Column('boolean', { name: CONTRACT.RED_FLAME })
  redFlame: boolean;

  /** Disarms bombs. */
  @Column('boolean', { name: CONTRACT.BOMB_DISARMER })
  bombDisarmer: boolean;

  /** Pushes bombs and other players. */
  @Column('boolean', { name: CONTRACT.POWER_GLOVE })
  powerGlove: boolean;

  /** Adds one heart. */
  @Column('boolean', { name: CONTRACT.HEART })
  heart: boolean;

  /** Adds a life. */
  @Column('boolean', { name: CONTRACT.LIFE_UP })
  lifeUp: boolean;
}
