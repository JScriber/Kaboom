import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ContestJoin')
export class ContestJoin {

  /** UUID of the contest. */
  @JsonProperty('uuid', String)
  uuid: string = undefined;
}
