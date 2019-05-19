import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('SignedIn')
export class SignedIn {

  @JsonProperty('id', Number)
  id: number = undefined;

  @JsonProperty('username', String)
  username: string = undefined;

  @JsonProperty('token', String)
  token: string = undefined;
}
