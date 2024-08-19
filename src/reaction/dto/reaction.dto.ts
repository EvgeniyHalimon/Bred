// library
import { ApiProperty } from '@nestjs/swagger';

// dto
import { UserDto } from 'src/user/dto';

export class ReactionDto {
  @ApiProperty({
    example: '9ee920f3-f3a3-4892-86a8-191f2c303614',
    type: String,
    description: 'Represents id of the reaction',
  })
  id: string;

  @ApiProperty({
    example: 'd0601328-1486-434a-860e-75b843a682db',
    type: String,
    description: 'Represents id of the user who reacted',
  })
  userId: string;

  @ApiProperty({
    example: 'article',
    type: String,
    description: 'Represents the type of source (article or comment)',
  })
  sourceType: string;

  @ApiProperty({
    example: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    type: String,
    nullable: true,
    description: 'Represents id of the article associated with the reaction',
  })
  articleId: string | null;

  @ApiProperty({
    example: null,
    type: String,
    nullable: true,
    description: 'Represents id of the comment associated with the reaction',
  })
  commentId: string | null;

  @ApiProperty({
    example: 'upvote',
    type: String,
    description: 'Represents the type of reaction (e.g., upvote, downvote)',
  })
  reactionType: string;

  @ApiProperty({
    example: '2024-08-19T09:40:15.000Z',
    type: String,
    description: 'Represents the creation date of the reaction',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-08-19T09:40:15.000Z',
    type: String,
    description: 'Represents the last update date of the reaction',
  })
  updatedAt: string;
}

export class ReactionDtoWithUser extends ReactionDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
}
