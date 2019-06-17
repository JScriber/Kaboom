import { JsonObject, JsonProperty } from 'json2typescript';
import { ContestAccessRooms } from './contest-access-rooms.model';

@JsonObject('ContestAccess')
export class ContestAccess {

  /** Websocket access token. */
  @JsonProperty('token', String)
  token: string = undefined;

  /** Rooms. */
  @JsonProperty('rooms', ContestAccessRooms)
  rooms: ContestAccessRooms = undefined;
}
