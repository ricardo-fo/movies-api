import { IsInt, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly director: string;

  @IsInt()
  readonly year: number;

  @IsString()
  readonly url: string;
}
