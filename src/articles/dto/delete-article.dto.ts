import { ApiProperty } from '@nestjs/swagger';

export class DeletedArticleDto {
  @ApiProperty({ example: 'Article deleted successfully' })
  message: string;
}
