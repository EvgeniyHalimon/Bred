// library
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Title of article',
    minLength: articlesFieldLengths.title.min,
    maxLength: articlesFieldLengths.title.max,
    type: String,
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
  @ApiProperty({
    description: 'Text content of article',
    minLength: articlesFieldLengths.text.min,
    maxLength: articlesFieldLengths.text.max,
    type: String,
  })
  readonly text: string;
}
