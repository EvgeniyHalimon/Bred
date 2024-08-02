import { IArticle } from 'src/articles/interfaces/article.interfaces';
import { IComment } from 'src/comments/interfaces/comments.interfaces';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  photo?: Buffer;
  articles?: IArticle[];
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
