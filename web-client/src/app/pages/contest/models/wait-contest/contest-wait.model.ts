import { JsonObject, JsonProperty } from 'json2typescript';
import { ContestSlots } from '../contest-slots.model';

/**
 * Streamed informations on the {@link Contest} while waiting.
 */
@JsonObject('ContestWait')
export class ContestWait {

  /** ID of the field. */
  @JsonProperty('field', Number)
  field: number = undefined;

  /** Slots. */
  @JsonProperty('slots', ContestSlots)
  slots: ContestSlots = undefined;

  /** Optional time limit. */
  @JsonProperty('duration', Number, true)
  duration: number | undefined = undefined;

  /** Says if the bonus are activated. */
  @JsonProperty('bonusActivated', Boolean)
  bonusActivated: boolean = undefined;

  /** Says if the penalties are activated. */
  @JsonProperty('penaltiesActivated', Boolean)
  penaltiesActivated: boolean = undefined;
}
