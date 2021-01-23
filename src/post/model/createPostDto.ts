import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly content: string;
}
