import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Language } from '@entity/user.entity';

export class UpdateUser {

  /** Unique username. */
  @ApiModelProperty()
  @MinLength(3, {
    message: 'Username must contain at least 3 characters.'
  })
  @IsString() readonly username: string;

  /** Unique email address. */
  @ApiModelProperty()
  @IsEmail()
  @IsString() readonly email: string;

  /** Language used by the client. */
  @ApiModelProperty()
  @IsOptional()
  @IsEnum(Language) readonly language: Language;
}
