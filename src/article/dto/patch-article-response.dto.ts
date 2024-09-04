// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { ArticleDto } from '.';

export class PatchArticleResponseDto {
  @ApiProperty({ type: ArticleDto })
  article: ArticleDto;

  @ApiProperty({ example: 'Article Big boss updated successfully' })
  message: string;
}
