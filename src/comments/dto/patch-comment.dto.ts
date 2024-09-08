// library
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// custom decorators
import {
  MaxLengthWithMessage,
  MinLengthWithMessage,
} from 'src/shared/decorators';

// constants
import { commentFieldLengths } from '../comment.constants';

export class PatchCommentDto {
  @IsString()
  @MinLengthWithMessage({ min: commentFieldLengths.text.min, property: 'Text' })
  @MaxLengthWithMessage({ max: commentFieldLengths.text.max, property: 'Text' })
  @ApiProperty({
    description: 'Text of comment',
    minLength: commentFieldLengths.text.min,
    maxLength: commentFieldLengths.text.max,
    type: String,
    example: 'hey, thats pretty good',
  })
  readonly text: string;
}
