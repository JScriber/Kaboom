import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ChangePassword')
export class ChangePassword {

  /** Old password. */
  @JsonProperty('oldPassword', String)
  oldPassword: string = undefined;

  /** New password. */
  @JsonProperty('newPassword', String)
  newPassword: string = undefined;
}
