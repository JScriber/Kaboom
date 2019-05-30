import { JsonObject, JsonProperty } from 'json2typescript';

/** Options for penalties. */
@JsonObject('CreateGamePenalties')
export class Penalties {

  /** Decreases the number of bombs. */
  @JsonProperty('bombDown', Boolean)
  bombDown: boolean = undefined;

  /** Decreases the range of the bombs. */
  @JsonProperty('blueFlame', Boolean)
  blueFlame: boolean = undefined;

  /** Decreases the speed. */
  @JsonProperty('clog', Boolean)
  clog: boolean = undefined;

  /** Set of diseases. */
  @JsonProperty('skull', Boolean)
  skull: boolean = undefined;
}
