import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Contest } from '@entity/contest.entity';

export class ContestJoin {

  /** UUID of the {@link Contest}. */
  @ApiModelProperty()
  @IsString() readonly uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
