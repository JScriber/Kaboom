import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ContestAccess')
export class ContestAccess {

  /** Websocket access token. */
  @JsonProperty('token', String)
  token: string = undefined;

  /** Room to listen for start. */
  @JsonProperty('startRoom', String)
  startRoom: string = undefined;

  /** Room to listen for change. */
  @JsonProperty('waitRoom', String)
  waitRoom: string = undefined;
}
