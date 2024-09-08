// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { DetailedArticleInfoDto } from './getById-article-response.dto';

export class GetAllArticlesResponseDto {
  @ApiProperty({ type: [DetailedArticleInfoDto] })
  articles: DetailedArticleInfoDto[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of articles',
  })
  count: number;
}
