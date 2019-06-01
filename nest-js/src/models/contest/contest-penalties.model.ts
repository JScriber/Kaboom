import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

/**
 * Penalties available in the game.
 */
export class Penalties {
  /** Lowers the number of bombs. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly bombDown: boolean;

  /** Decreases the speed of the player. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly speedDown: boolean;

  /** Decreases the explosion area. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly blueFlame: boolean;

  /** Inverts the controls. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly invert: boolean;
}
