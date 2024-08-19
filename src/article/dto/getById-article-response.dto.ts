// library
import { ApiProperty } from '@nestjs/swagger';

// dtos
import { ArticleDto } from '.';
import { UserDto } from 'src/user/dto';
import { ReactionDto } from 'src/reaction/dto';
import { CommentDto } from 'src/comment/dto/comment.dto';

export class DetailedArticleInfoDto extends ArticleDto {
  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty({ type: [ReactionDto] })
  reactions: ReactionDto[];

  @ApiProperty({ type: [CommentDto] })
  comments: CommentDto[];
}

export class GetByIdArticleResponseDto {
  @ApiProperty({ type: DetailedArticleInfoDto })
  article: DetailedArticleInfoDto;
}
