import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdentifiersInDto {
  /** Unique username. */
  @ApiModelProperty()
  @IsString() readonly username: string;

  /** Front-end encrypted password. */
  @ApiModelProperty()
  @IsString() readonly password: string;
}
