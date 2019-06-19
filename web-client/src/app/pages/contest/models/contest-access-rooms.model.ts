import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Room exposed for contest events.
 */
@JsonObject('ContestAccessRooms')
export class ContestAccessRooms {

  /** Room to listen for start. */
  @JsonProperty('start', String)
  start: string = undefined;

  /** Room to listen for change. */
  @JsonProperty('wait', String)
  wait: string = undefined;
}
