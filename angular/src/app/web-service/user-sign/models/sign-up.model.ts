import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('SignUp')
export class SignUp {

  @JsonProperty('username', String)
  username: string = undefined;

  @JsonProperty('email', String)
  email: string = undefined;

  @JsonProperty('password', String)
  password: string = undefined;

  @JsonProperty('language', String)
  language: string = undefined;
}
