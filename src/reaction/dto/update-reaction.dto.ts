// library
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

// types
import { ReactionType, SourceType } from '../reaction.types';
import { ReactionTypeEnum, SourceTypeEnum } from '../reaction.constants';

export class UpdateReactionDto {
  @IsOptional()
  @IsUUID(4)
  readonly commentId: string;

  @IsOptional()
  @IsUUID(4)
  readonly articleId: string;

  @IsEnum(ReactionTypeEnum)
  readonly reactionType: ReactionType;

  @IsEnum(SourceTypeEnum)
  readonly sourceType: SourceType;
}
