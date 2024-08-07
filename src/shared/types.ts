// library
import { Optional } from 'sequelize';

export type PartialExcept<T, K extends keyof T> = Optional<T, K>;
export interface IMessageResponse<T> {
  data: T;
  message: string;
}
