// library
import { Request } from 'express';
import { Optional } from 'sequelize';

// types
import { IUser } from 'src/user/interfaces/user.interfaces';

export type PartialExcept<T, K extends keyof T> = Optional<T, K>;

export interface ISimpleResponse<T, F extends string = string> {
  data: {
    [key in F]: T;
  };
}

export interface IMessageResponse<T> extends ISimpleResponse<T> {
  message: string;
}

export interface ISimpleMessageResponse {
  message: string;
}

export interface IPaginationResponse<T> extends ISimpleResponse<T> {
  count: number;
}

export interface ICustomRequest extends Request {
  user: IUser;
}

export type OrderType = 'ASC' | 'DESC';
