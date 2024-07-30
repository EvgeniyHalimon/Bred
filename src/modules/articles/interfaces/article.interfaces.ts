import { IUser } from 'src/modules/user/interfaces/user.interfaces';

export interface IArticle {
  id: string;
  title: string;
  rating: number;
  author: IUser;
  upvoters: IUser[];
  downvoters: IUser[];
  text: string;
}
