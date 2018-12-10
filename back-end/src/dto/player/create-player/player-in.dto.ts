import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlayerInDto {

  /** Unique username. */
  @ApiModelProperty()
  @IsString() readonly username: string;

  /** Unique email address. */
  @ApiModelProperty()
  @IsString() readonly email: string;

  /** Front-end encrypted password. */
  @ApiModelProperty()
  @IsString() readonly password: string;
}
