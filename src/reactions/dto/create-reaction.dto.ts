// library
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

// types
import {
  ReactionType,
  ReactionTypeEnum,
  SourceType,
  SourceTypeEnum,
} from '../interfaces/reaction.interfaces';

export class CreateReactionDto {
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
