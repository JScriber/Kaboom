import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class Credentials {
  /** Unique username. */
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString() readonly username: string;

  /** Front-end password. */
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString() readonly password: string;
}
