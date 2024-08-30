// library
import { ApiProperty } from '@nestjs/swagger';

// schema
import Comment from '../comment.schema';

export class DeletedCommentResponseDto extends Comment {
  @ApiProperty({ example: 'Comment deleted successfully' })
  message: string;
}
