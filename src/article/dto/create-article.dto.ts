// library
import { IsString, MaxLength, MinLength } from 'class-validator';

// constants
import { articlesFieldLengths } from '../article.constants';

export class CreateArticleDto {
  @IsString()
  @MinLength(articlesFieldLengths.title.min, {
    message: `$property must be ${articlesFieldLengths.title.min} or more characters long`,
  })
  @MaxLength(articlesFieldLengths.title.max, {
    message: `$property must be ${articlesFieldLengths.title.max} or more characters long`,
  })
  readonly title: string;

  @IsString()
  @MinLength(articlesFieldLengths.text.min, {
    message: `$property must be ${articlesFieldLengths.text.min} or more characters long`,
  })
  @MaxLength(articlesFieldLengths.text.max, {
    message: `$property must be ${articlesFieldLengths.text.max} or more characters long`,
  })
  readonly text: string;
}
