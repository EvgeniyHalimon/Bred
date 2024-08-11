// library
import { IsString } from 'class-validator';

// custom decorators
import {
  MaxLengthWithMessage,
  MinLengthWithMessage,
} from 'src/shared/decorators';

// constants
import { articlesFieldLengths } from '../article.constants';

export class CreateArticleDto {
  @IsString()
  @MinLengthWithMessage({
    min: articlesFieldLengths.title.min,
    property: 'Title',
  })
  @MaxLengthWithMessage({
    max: articlesFieldLengths.title.max,
    property: 'Title',
  })
  readonly title: string;

  @IsString()
  @MinLengthWithMessage({
    min: articlesFieldLengths.text.min,
    property: 'Text',
  })
  @MaxLengthWithMessage({
    max: articlesFieldLengths.text.max,
    property: 'Text',
  })
  readonly text: string;
}
