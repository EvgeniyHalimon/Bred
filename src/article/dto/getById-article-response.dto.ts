// library
import { ApiProperty } from '@nestjs/swagger';

// dtos
import { ArticleDto } from '.';
import { UserDto } from 'src/user/dto';
import { ReactionDtoWithUser } from 'src/reaction/dto';
import { CommentWithAuthor } from 'src/comment/dto';

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
