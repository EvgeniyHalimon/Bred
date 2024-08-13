// library
import { IsString, IsUUID } from 'class-validator';

// custom decorators
import {
  MaxLengthWithMessage,
  MinLengthWithMessage,
} from 'src/shared/decorators';

// constants
import { commentFieldLengths } from '../comment.constants';

export class CreateCommentDto {
  @IsUUID(4)
  readonly articleId: string;

  @IsString()
  @MinLengthWithMessage({ min: commentFieldLengths.text.min, property: 'Text' })
  @MaxLengthWithMessage({ max: commentFieldLengths.text.max, property: 'Text' })
  readonly text: string;
}
