import { ApiProperty } from '@nestjs/swagger';

export class DeletedArticleResponseDto {
  @ApiProperty({ example: 'Article deleted successfully' })
  message: string;
}
