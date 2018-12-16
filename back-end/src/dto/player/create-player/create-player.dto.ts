import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreatePlayer {

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

  /** Front-end password. */
  @ApiModelProperty()
  @IsNotEmpty()
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, {
    message: 'Password must contain lowercases, uppercases and numbers. Minimal length: 6.'
  })
  @IsString() readonly password: string;
}
