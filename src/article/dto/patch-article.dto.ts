// library
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Title of article',
    minLength: articlesFieldLengths.title.min,
    maxLength: articlesFieldLengths.title.max,
    required: false,
    type: String,
    example: 'Big Boss',
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
  @IsOptional()
  @ApiProperty({
    description: 'Text content of article',
    minLength: articlesFieldLengths.text.min,
    maxLength: articlesFieldLengths.text.max,
    required: false,
    type: String,
    example: 'Man who sold the world',
  })
  readonly text: string;
}
