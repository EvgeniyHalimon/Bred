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
    minimum: articlesFieldLengths.title.min,
    maximum: articlesFieldLengths.title.max,
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
    minimum: articlesFieldLengths.text.min,
    maximum: articlesFieldLengths.text.max,
  })
  readonly text: string;
}
