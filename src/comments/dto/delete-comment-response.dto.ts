// library
import { ApiProperty } from '@nestjs/swagger';

export class DeletedCommentResponseDto {
  @ApiProperty({ example: 'Comment deleted successfully' })
  message: string;
}
