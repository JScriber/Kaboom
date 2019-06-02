import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 * Penalties available in the game.
 */
export class Penalties {

  /** Decreases the number of bombs. */
  @ApiModelProperty({
    required: true,
    description: 'Decreases the number of bombs.'
  })
  @IsBoolean() readonly bombDown: boolean = undefined;

  /** Decreases the range of the bombs. */
  @ApiModelProperty({
    required: true,
    description: 'Decreases the range of the bombs.'
  })
  @IsBoolean() readonly blueFlame: boolean = undefined;

  /** Decreases the speed. */
  @ApiModelProperty({
    required: true,
    description: 'Decreases the speed.'
  })
  @IsBoolean() readonly clog: boolean = undefined;

  /** Set of diseases. */
  @ApiModelProperty({
    required: true,
    description: 'Set of diseases.'
  })
  @IsBoolean() readonly skull: boolean = undefined;
}
