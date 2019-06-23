import { Entity, IdentifyProperty, Property, RelationProperty } from 'orm-redis';

// Associated entities.
import { Player } from './player.entity';

/**
 * Dropped bomb on the battlefield.
 */
@Entity()
export class Bomb {

  /** Unique identifier. */
  @IdentifyProperty()
  id: number;

  /** X position on the battlefield. */
  @Property(Number)
  positionX: number;

  /** Y position on the battlefield. */
  @Property(Number)
  positionY: number;

  /** Date at which the bomb has been placed. */
  @Property(String)
  putAt: String;

  /** Countdown before it explodes in miliseconds. */
  @Property(Number)
  countdown: number;

  /** Range of the blast. */
  @Property(Number)
  blast: number;

  /** Dropped bombs by the player. */
  @RelationProperty(type => Player)
  owner: Player;
}
