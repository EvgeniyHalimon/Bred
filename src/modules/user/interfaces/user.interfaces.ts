import { IArticle } from 'src/modules/articles/interfaces/article.interfaces';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  photo?: string;
  articles?: IArticle[];
}
