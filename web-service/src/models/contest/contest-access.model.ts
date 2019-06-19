
/**
 * Rooms to listen for changes.
 */
export interface ContestAccessRooms {

  /** Room to listen for contest start. */
  start: string;

  /** Room to listen for contest change. */
  wait: string;
}

/**
 * Access token to websockets.
 */
export class ContestAccess {

  /** Token to access the websockets. */
  token: string;

  /** Rooms to listen for changes. */
  rooms: ContestAccessRooms;

  constructor(token: string, startRoom: string, waitRoom: string) {
    this.token = token;
    
    this.rooms = {
      start: startRoom,
      wait: waitRoom
    };
  }
}
