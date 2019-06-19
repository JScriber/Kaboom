import { Entity, IdentifyProperty, Property } from 'orm-redis';

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

  /** Says if the player has joined the game. */
  @Property(Boolean)
  confirmed: boolean;

  /** X position of the player on the battlefield. */
  @Property(Number)
  positionX: number;

  /** Y position of the player on the battlefield. */
  @Property(Number)
  positionY: number;

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

  // TODO: Add stored items... Number of bombs. Skin, etc.
}
