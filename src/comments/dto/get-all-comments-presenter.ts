// library
import { ApiProperty } from '@nestjs/swagger';

// dtos
import { ReactionDtoWithUser } from 'src/reactions/dto';
import { UserPresenter } from 'src/users/dto';
import { CommentPresenter } from './comment-presenter';
import Comment from '../comment.schema';

export class DetailedCommentsDto extends CommentPresenter {
  @ApiProperty({ type: UserPresenter })
  author: UserPresenter;

  @ApiProperty({ type: [ReactionDtoWithUser] })
  reactions: ReactionDtoWithUser[];
}

export class GetAllCommentsPresenter {
  @ApiProperty({ type: [DetailedCommentsDto] })
  comments: DetailedCommentsDto[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of comments',
  })
  count: number;

  constructor(comments: Comment[], count: number) {
    this.comments = comments.map(comment => new DetailedCommentsDto(comment));
    this.count = count;
  }
}
