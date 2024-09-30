import { CommentWithAuthor } from 'src/comments/dto';
import { ReactionDtoWithUser } from 'src/reactions/dto';
import { UserDto } from 'src/users/dto';
import Article from '../article.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ArticlePresenter {
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

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.text = article.text;
    this.authorId = article.authorId;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
    this.rating = article.rating;
  }
}

export class DetailedArticlePresenter extends ArticlePresenter {
  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty({ type: [ReactionDtoWithUser] })
  reactions: ReactionDtoWithUser[];

  @ApiProperty({ type: [CommentWithAuthor] })
  comments: CommentWithAuthor[];
  constructor(article: any) {
    super(article);
    this.author = article.author;
    this.reactions = article.reactions;
    this.comments = article.comments;
  }
}

export class GetAllArticlesPresenter {
  @ApiProperty({ type: [DetailedArticlePresenter] })
  articles: DetailedArticlePresenter[];

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Represents count of articles',
  })
  count: number;

  constructor(articles: Article[], count: number) {
    this.articles = articles.map(
      article => new DetailedArticlePresenter(article),
    );
    this.count = count;
  }
}
