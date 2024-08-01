import { IsString } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  readonly userId: string;
  @IsString()
  readonly articleId: string;
  @IsString()
  readonly reactionType: string;
}
