import { JsonObject, JsonProperty } from 'json2typescript';

import { ContestSlots } from '../contest-slots.model';

/**
 * Minimal representation of a Contest.
 */
@JsonObject('ContestIndex')
export class ContestIndex {

  /** UUID of the game. */
  @JsonProperty('uuid', String)
  uuid: string = undefined;

  /** ID of the field. */
  @JsonProperty('field', Number)
  field: number = undefined;

  /** Slots informations. */
  @JsonProperty('slots', ContestSlots)
  slots: ContestSlots = undefined;

  /** Optional time limit. */
  @JsonProperty('duration', Number, true)
  duration: number | undefined = undefined;
}
