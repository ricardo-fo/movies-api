import { IsString } from 'class-validator';

export class AuthenticateUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
