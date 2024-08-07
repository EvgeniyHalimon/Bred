// library
import { Optional } from 'sequelize';

// types
import { IUser } from 'src/user/interfaces/user.interfaces';

export type PartialExcept<T, K extends keyof T> = Optional<T, K>;

export interface IMessageResponse<T> {
  data: T;
  message: string;
}

export interface ICustomRequest extends Request {
  user: IUser;
}
