import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

/**
 * Bonus available in the game.
 */
export class Bonus {
  /** The player can pass through walls. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly wallPass: boolean;

  /** The player is teleported somewhere. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly teleportation: boolean;

  /** The player no longer fears fire. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly fireSuit: boolean;

  /** Increases the number of bombs dropped simultaneously. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly bombUp: boolean;

  /** Increases the speed of the player. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly speedUp: boolean;

  /** Increases the explosion area. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly yellowFlame: boolean;

  /** No limit to explosion. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly redFlame: boolean;

  /** Can disarm bombs. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly bombDisarmer: boolean;

  /** Can push bombs. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly powerGlove: boolean;

  /** Can push other players. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly push: boolean;

  /** Add one heart to the player. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly heart: boolean;

  /** Add one life to the player. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly lifeUp: boolean;

  /** Swap positions with another player. */
  @ApiModelProperty({ required: false })
  @IsOptional()
  @IsBoolean() readonly swapPositions: boolean;
}
