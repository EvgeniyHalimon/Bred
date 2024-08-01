import { IsString } from 'class-validator';

export class CreateCommentDto {
  readonly author: string;
  @IsString()
  readonly text: string;
}
