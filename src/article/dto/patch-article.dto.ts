// library
import { IsOptional, IsString } from 'class-validator';

// custom decorators
import {
  MaxLengthWithMessage,
  MinLengthWithMessage,
} from 'src/shared/decorators';

// constants
import { articlesFieldLengths } from '../article.constants';

export class PatchArticleDto {
  @IsString()
  @MinLengthWithMessage({
    min: articlesFieldLengths.title.min,
    property: 'Title',
  })
  @MaxLengthWithMessage({
    max: articlesFieldLengths.title.max,
    property: 'Title',
  })
  @IsOptional()
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
  @IsOptional()
  readonly text: string;
}
