import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('AuthentificatedUser')
export class User {

  /** Username of the user. */
  @JsonProperty('username', String)
  username: string = undefined;

  /** Email address. */
  @JsonProperty('email', String)
  email: string = undefined;

  /** Language preference. */
  @JsonProperty('language', String)
  language: string = undefined;
}
