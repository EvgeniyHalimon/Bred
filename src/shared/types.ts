// library
import { Optional } from 'sequelize';

export type PartialExcept<T, K extends keyof T> = Optional<T, K>;
