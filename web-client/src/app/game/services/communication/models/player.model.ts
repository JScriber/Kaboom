export enum Skin {
  Player1,
  Player2,
  Player3,
  Player4
}

export interface Player {

  /** Unique identifier. */
  id: number;

  /** ID of the related participant. */
  participantId: number;

  /** Says if the player has joined the game. */
  confirmed: boolean;

  /** X position of the player on the battlefield. */
  positionX: number;

  /** Y position of the player on the battlefield. */
  positionY: number;

  /** Skin of the player. */
  skin: Skin;

  /**
   * Lives left to the player.
   * A player without at least one life left is considered dead.
   */
  lives: number;

  /**
   * Hearts left to the player.
   * If the player loses three hearts, he loses a life.
   */
  hearts: number;

  /** Speed at which the player moves. */
  speed: number;
}
