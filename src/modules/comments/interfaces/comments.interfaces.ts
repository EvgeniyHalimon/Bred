import { IUser } from 'src/modules/user/interfaces/user.interfaces';

export interface IComment {
  author: IUser;
  likes: IUser;
  dislikes: IUser;
  text: string;
}

export interface IReactions {
  userId: string;
  commentId: string;
}
