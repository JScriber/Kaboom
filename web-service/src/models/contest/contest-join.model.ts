import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContestJoin {

  /** UUID of the {@link Contest}. */
  @ApiModelProperty()
  @IsString() readonly uuid: string;
}
