import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Token')
export class Token {

  @JsonProperty('token', String)
  token: string = undefined;
}
