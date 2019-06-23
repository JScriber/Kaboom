import { Entity, IdentifyProperty, Property, RelationProperty } from 'orm-redis';
import { Bomb } from './bomb.entity';

export enum Skin {
  Player1,
  Player2,
  Player3,
  Player4
}


/**
 * Playing {@link Participant} of a {@link Contest}.
 */
@Entity()
export class Player {

  /** Unique identifier. */
  @IdentifyProperty()
  id: number;

  /** ID of the related participant. */
  @Property(Number)
  participantId: number;

  /** Says if the player is connected. */
  @Property(Boolean)
  connected: boolean;

  /** X position of the player on the battlefield. */
  @Property(Number)
  positionX: number;

  /** Y position of the player on the battlefield. */
  @Property(Number)
  positionY: number;

  /** Skin of the player. */
  @Property(Number)
  skin: Number;

  /**
   * Lives left to the player.
   * A player without at least one life left is considered dead.
   */
  @Property(Number)
  lives: number;

  /**
   * Hearts left to the player.
   * If the player loses three hearts, he loses a life.
   */
  @Property(Number)
  hearts: number;

  /** Speed at which the player moves. */
  @Property(Number)
  speed: number;

  /** Maximum number of bombs the player can drop. */
  @Property(Number)
  maxBombs: number;

  // TODO: Add stored items... Number of bombs. Skin, etc.
}
