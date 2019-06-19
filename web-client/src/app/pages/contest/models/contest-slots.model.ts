import { JsonObject, JsonProperty } from 'json2typescript';

/**
 * Information on the slots of a {@link Contest}.
 */
@JsonObject('ContestSlots')
export class ContestSlots {

  /** Used slots. */
  @JsonProperty('taken', Number)
  taken: number = undefined;

  /** Total number of slots. */
  @JsonProperty('total', Number)
  total: number = undefined;
}
