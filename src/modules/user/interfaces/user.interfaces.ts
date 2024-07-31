import { IArticle } from 'src/modules/articles/interfaces/article.interfaces';
import { IComment } from 'src/modules/comments/interfaces/comments.interfaces';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  photo?: string;
  articles?: IArticle[];
  comments?: IComment[];
}
