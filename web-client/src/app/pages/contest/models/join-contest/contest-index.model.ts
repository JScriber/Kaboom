import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ContestIndex')
export class ContestIndex {

  /** UUID of the game. */
  @JsonProperty('uuid', String)
  uuid: string = undefined;

  /** ID of the field. */
  @JsonProperty('field', Number)
  field: number = undefined;

  /** Empty slots. */
  @JsonProperty('emptySlots', Number)
  emptySlots: number = undefined;

  /** Total number of slots. */
  @JsonProperty('totalSlots', Number)
  totalSlots: number = undefined;

  /** Optionnal time limit. */
  @JsonProperty('timeLimit', Number, true)
  timeLimit: number | undefined = undefined;
}
