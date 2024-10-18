// library
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// custom decorators
import {
  MaxLengthWithMessage,
  MinLengthWithMessage,
} from 'src/shared/decorators';

// constants
import { commentFieldLengths } from '../comment.constants';

export class CreateCommentDto {
  @IsUUID(4)
  @ApiProperty({
    description: 'Id of article',
    type: String,
    example: '659a80d5-2057-4866-bea9-18c3c76b4884',
  })
  readonly articleId: string;

  @IsString()
  @MinLengthWithMessage({ min: commentFieldLengths.text.min, property: 'text' })
  @MaxLengthWithMessage({ max: commentFieldLengths.text.max, property: 'text' })
  @ApiProperty({
    description: 'Text of comment',
    minLength: commentFieldLengths.text.min,
    maxLength: commentFieldLengths.text.max,
    type: String,
    example: 'hey, thats pretty good',
  })
  readonly text: string;
}
