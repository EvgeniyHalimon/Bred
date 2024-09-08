// library
import { ApiProperty } from '@nestjs/swagger';

// dtos
import { ReactionDtoWithUser } from 'src/reactions/dto';
import { UserDto } from 'src/users/dto';
import { CommentDto } from './comment.dto';

export class DetailedCommentsDto extends CommentDto {
  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty({ type: [ReactionDtoWithUser] })
  reactions: ReactionDtoWithUser[];
}

export class GetAllCommentsResponseDto {
  @ApiProperty({ type: [DetailedCommentsDto] })
  comments: DetailedCommentsDto[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of comments',
  })
  count: number;
}
