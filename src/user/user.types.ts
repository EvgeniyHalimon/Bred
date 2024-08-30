// types
import { IArticle } from 'src/article/article.types';
import { IComment } from 'src/comment/comment.types';

// constants
import { UserRolesEnum } from './user.constants';
import { UpdateUserDto } from './dto';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  role: UserRole;
  photo: string | null;
  articles?: IArticle[];
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | UserRolesEnum.USER
  | UserRolesEnum.ADMIN
  | UserRolesEnum.SUPER_ADMIN;

export interface CustomFileTypeValidatorOptions {
  fileType: string | RegExp;
  message?: string;
}

export interface UpdateUserWithFile extends Partial<UpdateUserDto> {
  photo: string | null;
}
