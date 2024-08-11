// library
import { IsEnum, IsString, IsUUID } from 'class-validator';

// types
import { ReactionType, SourceType } from '../reaction.types';
import { ReactionTypeEnum, SourceTypeEnum } from '../reaction.constants';

export class CreateReactionDto {
  @IsString()
  @IsUUID(4)
  readonly userId: string;

  @IsString()
  @IsUUID(4)
  readonly sourceId: string;

  @IsEnum(ReactionTypeEnum)
  readonly reactionType: ReactionType;

  @IsEnum(SourceTypeEnum)
  readonly sourceType: SourceType;
}
