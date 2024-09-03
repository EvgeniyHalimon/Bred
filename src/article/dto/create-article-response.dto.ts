import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({
    example: '785e6094-2f33-49a9-b015-25cd12dab20a',
    type: String,
    description: 'Represents id of article',
  })
  id: string;

  @ApiProperty({
    example: 0,
    type: Number,
    description: 'Represents rating of article which is 0 when created',
  })
  rating: number;

  @ApiProperty({
    example: 'You',
    type: String,
    description: 'Represents title of article',
  })
  title: string;

  @ApiProperty({
    example: 'New Big Boss',
    type: String,
    description: 'Represents text of article',
  })
  text: string;

  @ApiProperty({
    example: 'd0601328-1486-434a-860e-75b843a682db',
    type: String,
    description: 'Represents id of author',
  })
  authorId: string;

  @ApiProperty({
    example: '2024-08-16T12:15:52.795Z',
    type: Date,
    description: 'Represents date of update of the article author',
  })
  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-16T12:15:52.795Z',
    type: Date,
    description: 'Represents date of creation of the article author',
  })
  @ApiProperty()
  updatedAt: Date;
}

export class CreateArticleResponseDto {
  @ApiProperty({ type: ArticleDto })
  article: ArticleDto;

  @ApiProperty({ example: 'Article "You" created successfully' })
  message: string;
}
