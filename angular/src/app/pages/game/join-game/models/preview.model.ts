import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('GamePreview')
export class Preview {

  /** ID of the game. */
  @JsonProperty('id', Number)
  id: number;

  /** ID of the field. */
  @JsonProperty('field', Number)
  field: number;

  /** Empty slots. */
  @JsonProperty('emptySlots', Number)
  emptySlots: number;

  /** Total number of slots. */
  @JsonProperty('totalSlots', Number)
  totalSlots: number;

  /** Optionnal time limit. */
  @JsonProperty('timeLimit', Number, true)
  timeLimit: number | undefined;
}
