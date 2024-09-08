// library
import { ApiProperty } from '@nestjs/swagger';

// dtos
import { ArticleDto } from '.';
import { UserDto } from 'src/users/dto';
import { ReactionDtoWithUser } from 'src/reactions/dto';
import { CommentWithAuthor } from 'src/comments/dto';

export class DetailedArticleInfoDto extends ArticleDto {
  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty({ type: [ReactionDtoWithUser] })
  reactions: ReactionDtoWithUser[];

  @ApiProperty({ type: [CommentWithAuthor] })
  comments: CommentWithAuthor[];
}

export class GetByIdArticleResponseDto {
  @ApiProperty({ type: DetailedArticleInfoDto })
  article: DetailedArticleInfoDto;
}
