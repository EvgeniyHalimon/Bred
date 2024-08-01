import { IsEnum, IsString, IsUUID } from 'class-validator';
import {
  ReactionType,
  ReactionTypeEnum,
  SourceType,
  SourceTypeEnum,
} from '../interfaces/reaction.interfaces';

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
