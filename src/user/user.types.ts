// types
import { IArticle } from 'src/article/article.types';
import { IComment } from 'src/comment/comment.types';

// constants
import { UserRolesEnum } from './user.constants';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  role: UserRole;
  photo?: Buffer;
  articles?: IArticle[];
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = UserRolesEnum.USER | UserRolesEnum.ADMIN;

export interface CustomFileTypeValidatorOptions {
  fileType: string | RegExp;
  message?: string;
}
