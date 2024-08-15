// library
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// types
import { ReactionType, SourceType } from '../reaction.types';
import { ReactionTypeEnum, SourceTypeEnum } from '../reaction.constants';

export class CreateReactionDto {
  @IsOptional()
  @IsUUID(4)
  @ApiProperty({
    description: 'Id of comment',
    type: String,
    required: false,
  })
  readonly commentId: string;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({
    description: 'Id of article',
    type: String,
    required: false,
  })
  readonly articleId: string;

  @IsEnum(ReactionTypeEnum)
  @ApiProperty({
    description: 'Reaction type',
    enum: ReactionTypeEnum,
    name: 'reactionType',
  })
  readonly reactionType: ReactionType;

  @IsEnum(SourceTypeEnum)
  @ApiProperty({
    description: 'Type of source where we send the reaction',
    enum: SourceTypeEnum,
    name: 'sourceType',
  })
  readonly sourceType: SourceType;
}
