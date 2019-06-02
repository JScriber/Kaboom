import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('SignIn')
export class SignIn {

  @JsonProperty('username', String)
  username: string = undefined;

  @JsonProperty('username', String)
  password: string = undefined;
}
