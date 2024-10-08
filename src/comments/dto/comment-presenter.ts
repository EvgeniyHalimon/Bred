// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { UserPresenter } from 'src/users/dto';
import Comment from '../comment.schema';

export class CommentPresenter {
  @ApiProperty({
    example: '7770ec1a-cdbf-47c1-85db-35fbfc55d6a3',
    type: String,
    description: 'Represents id of the comment',
  })
  id: string;

  @ApiProperty({
    example: 'd0601328-1486-434a-860e-75b843a682db',
    type: String,
    description: 'Represents id of the author who made the comment',
  })
  authorId: string;

  @ApiProperty({
    example: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    type: String,
    description: 'Represents id of the article associated with the comment',
  })
  articleId: string;

  @ApiProperty({
    example: 'cool',
    type: String,
    description: 'Represents the text content of the comment',
  })
  text: string;

  @ApiProperty({
    example: '2024-08-19T09:40:25.000Z',
    type: String,
    description: 'Represents the creation date of the comment',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-19T09:40:25.000Z',
    type: String,
    description: 'Represents the last update date of the comment',
  })
  updatedAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.authorId = comment.authorId;
    this.articleId = comment.articleId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}

export class CommentWithAuthorPresenter extends CommentPresenter {
  @ApiProperty({ type: UserPresenter })
  author: UserPresenter;
}
