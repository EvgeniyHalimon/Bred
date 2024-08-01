import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { commentFieldLengths } from '../validation/validationConstants';

export class CreateCommentDto {
  @IsUUID('4')
  readonly authorId: string;
  @IsString()
  @MinLength(commentFieldLengths.text.min, {
    message: `$property must be ${commentFieldLengths.text.min} or more characters long`,
  })
  @MaxLength(commentFieldLengths.text.max, {
    message: `$property must be maximum ${commentFieldLengths.text.max} characters long`,
  })
  readonly text: string;
}
