import { JsonObject, JsonProperty } from 'json2typescript';

// Alterations.
import { Bonus } from './alterations/bonus.model';
import { Penalties } from './alterations/penalties.model';

@JsonObject('CreateGame')
export class CreateGame {

  /** Number of players in the game. */
  @JsonProperty('player', Number)
  players: number = undefined;

  /** Optional duration. */
  @JsonProperty('duration', Number, true)
  duration: number | undefined = undefined;

  /** ID of the map used as battlefield. */
  @JsonProperty('map', Number)
  map: number = undefined;

  /** List of the bonus. */
  @JsonProperty('bonus', Bonus, true)
  bonus: Bonus = undefined;

  /** List of the penalties. */
  @JsonProperty('penalties', Penalties, true)
  penalties: Penalties = undefined;
}
