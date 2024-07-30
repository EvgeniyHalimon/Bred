import { IUser } from 'src/modules/user/interfaces/user.interfaces';

export interface IComment {
  id: string;
  authorId: string;
  likes: IUser;
  dislikes: IUser;
  text: string;
}

export interface IReactions {
  userId: string;
  commentId: string;
}
