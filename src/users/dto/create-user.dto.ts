import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  readonly userTypeId: number;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  password: string;

  @IsString()
  readonly username: string;
}
