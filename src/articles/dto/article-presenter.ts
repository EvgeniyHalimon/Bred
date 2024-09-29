import { CommentWithAuthor } from 'src/comments/dto';
import { ReactionDtoWithUser } from 'src/reactions/dto';
import { UserDto } from 'src/users/dto';
import Article from '../article.schema';

export class ArticlePresenter {
  id: string;
  rating: number;
  title: string;
  text: string;
  authorId: string;
  createdAt: Date;
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

export class ArticleByIdPresenter extends ArticlePresenter {
  author: UserDto;
  reactions: ReactionDtoWithUser[];
  comments: CommentWithAuthor[];
  constructor(article: any) {
    super(article);
    this.author = article.author;
    this.reactions = article.reactions;
    this.comments = article.comments;
  }
}
