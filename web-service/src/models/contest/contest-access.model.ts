/**
 * Access token to websockets.
 */
export class ContestAccess {

  /** Token to access the websockets. */
  token: string;

  /** Room to listen for contest start. */
  startRoom: string;

  /** Room to listen for contest change. */
  waitRoom: string;

  constructor(token: string, startRoom: string, waitRoom: string) {
    this.token = token;
    this.startRoom = startRoom;
    this.waitRoom = waitRoom;
  }
}
