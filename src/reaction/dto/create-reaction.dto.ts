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
    example: '659a80d5-2057-4866-bea9-18c3c76b4884',
  })
  readonly commentId: string;

  @IsOptional()
  @IsUUID(4)
  @ApiProperty({
    description: 'Id of article',
    type: String,
    required: false,
    example: '659a80d5-2057-4866-bea9-18c3c76b4884',
  })
  readonly articleId: string;

  @IsEnum(ReactionTypeEnum)
  @ApiProperty({
    description: 'Reaction type',
    enum: ReactionTypeEnum,
    name: 'reactionType',
    example: ReactionTypeEnum.UPVOTE,
  })
  readonly reactionType: ReactionType;

  @IsEnum(SourceTypeEnum)
  @ApiProperty({
    description: 'Type of source where we send the reaction',
    enum: SourceTypeEnum,
    name: 'sourceType',
    example: SourceTypeEnum.ARTICLE,
  })
  readonly sourceType: SourceType;
}
