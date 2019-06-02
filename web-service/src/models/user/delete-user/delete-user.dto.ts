import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { PASSWORD_REGEX } from '@environment';

export class DeleteUser {

  /** Front-end password. */
  @ApiModelProperty()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: 'Password must contain lowercases, uppercases and numbers. Minimal length: 6.'
  })
  @IsString() readonly password: string;
}
