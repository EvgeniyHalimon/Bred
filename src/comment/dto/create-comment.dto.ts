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
  })
  readonly articleId: string;

  @IsString()
  @MinLengthWithMessage({ min: commentFieldLengths.text.min, property: 'Text' })
  @MaxLengthWithMessage({ max: commentFieldLengths.text.max, property: 'Text' })
  @ApiProperty({
    description: 'Text of comment',
    minLength: commentFieldLengths.text.min,
    maxLength: commentFieldLengths.text.max,
    type: String,
  })
  readonly text: string;
}
