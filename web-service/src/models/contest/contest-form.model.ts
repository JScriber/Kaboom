import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

import { Bonus } from './contest-bonus.model';
import { Penalties } from './contest-penalties.model';

/**
 * Settings of the contest.
 */
export class ContestForm {

  /** Number of players in the game. */
  @ApiModelProperty()
  @IsNumber() readonly players: number;

  /** Time limit in minutes. */
  @ApiModelProperty({
    description: 'Time limit in minutes. Set to null if no time limit.'
  })
  @IsOptional()
  @IsNumber() readonly duration: number;

  /** ID of the map used as battlefield. */
  @ApiModelProperty()
  @IsNumber() readonly map: number;

  /** List of the bonus. */
  @ApiModelProperty()
  readonly bonus: Bonus;

  /** List of the penalties. */
  @ApiModelProperty()
  readonly penalties: Penalties;
}
