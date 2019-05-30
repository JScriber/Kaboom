import { JsonObject, JsonProperty } from 'json2typescript';

/** Options for bonus. */
@JsonObject('CreateGameBonus')
export class Bonus {

  /** Can go through the walls. */
  @JsonProperty('wallPass', Boolean)
  wallPass: boolean = undefined;

  /** Not impacted by fire. */
  @JsonProperty('fireSuit', Boolean)
  fireSuit: boolean = undefined;

  /** More bombs. */
  @JsonProperty('bombUp', Boolean)
  bombUp: boolean = undefined;

  /** Increases speed. */
  @JsonProperty('skate', Boolean)
  skate: boolean = undefined;

  /** Wider range for bombs. */
  @JsonProperty('yellowFlame', Boolean)
  yellowFlame: boolean = undefined;

  /** Infinite range for bombs. */
  @JsonProperty('redFlame', Boolean)
  redFlame: boolean = undefined;

  /** Disarms bombs. */
  @JsonProperty('bombDisarmer', Boolean)
  bombDisarmer: boolean = undefined;

  /** Pushes bombs and other players. */
  @JsonProperty('powerGlove', Boolean)
  powerGlove: boolean = undefined;

  /** Adds one heart. */
  @JsonProperty('heart', Boolean)
  heart: boolean = undefined;

  /** Adds a life. */
  @JsonProperty('lifeUp', Boolean)
  lifeUp: boolean = undefined;
}
