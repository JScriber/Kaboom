import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('StartContest')
export class StartContest {

  /** Authentification token. */
  @JsonProperty('token', String)
  token: string = undefined;
}
