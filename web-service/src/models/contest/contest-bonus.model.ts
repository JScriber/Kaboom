import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 * Bonus available in the game.
 */
export class Bonus {

  /** Can go through the walls. */
  @ApiModelProperty({
    required: true,
    description: 'Can go through the walls.'
  })
  @IsBoolean() readonly wallPass: boolean;

  /** Not impacted by fire. */
  @ApiModelProperty({
    required: true,
    description: 'Not impacted by fire.'
  })
  @IsBoolean() readonly fireSuit: boolean;

  /** More bombs. */
  @ApiModelProperty({
    required: true,
    description: 'More bombs.'
  })
  @IsBoolean() readonly bombUp: boolean;

  /** Increases speed. */
  @ApiModelProperty({
    required: true,
    description: 'Increases speed.'
  })
  @IsBoolean() readonly skate: boolean;

  /** Wider range for bombs. */
  @ApiModelProperty({
    required: true,
    description: 'Wider range for bombs.'
  })
  @IsBoolean() readonly yellowFlame: boolean;

  /** Infinite range for bombs. */
  @ApiModelProperty({
    required: true,
    description: 'Infinite range for bombs.'
  })
  @IsBoolean() readonly redFlame: boolean;

  /** Disarms bombs. */
  @ApiModelProperty({
    required: true,
    description: 'Disarms bombs.'
  })
  @IsBoolean() readonly bombDisarmer: boolean;

  /** Pushes bombs and other players. */
  @ApiModelProperty({
    required: true,
    description: 'Pushes bombs and other players.'
  })
  @IsBoolean() readonly powerGlove: boolean;

  /** Adds one heart. */
  @ApiModelProperty({
    required: true,
    description: 'Adds one heart.'
  })
  @IsBoolean() readonly heart: boolean;

  /** Adds a life. */
  @ApiModelProperty({
    required: true,
    description: 'Adds a life.'
  })
  @IsBoolean() readonly lifeUp: boolean;
}
