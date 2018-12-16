import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export namespace ContestDTO {

  /**
   * Bonus available in the game.
   */
  class Bonus {
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

  /**
   * Penalties available in the game.
   */
  class Penalty {
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

  /**
   * Settings of the contest. (used in POST)
   */
  export class ContestSettings {

    /** Map used in the contest. */
    @ApiModelProperty()
    @IsNumber() readonly mapID: number;

    /** Time limit in minutes. */
    @ApiModelProperty({
      description: 'Time limit in minutes. Set to null if no time limit.'
    })
    @IsOptional()
    @IsNumber() readonly timeLimit: number;

    /** Bonus that may appear during the contest. */
    @ApiModelProperty()
    readonly bonus: Bonus;

    /** Penalties that may appear during the contest. */
    @ApiModelProperty()
    readonly penalties: Penalty;

    // TODO: Implement bombs.
  }
}
