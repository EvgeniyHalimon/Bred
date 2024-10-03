// types
import { OrderType } from 'src/shared/types';

export interface IArticle {
  id: string;
  title: string;
  rating: number;
  authorId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ArticleOrderByEnum {
  id = 'id',
  title = 'title',
  rating = 'rating',
  authorId = 'authorId',
  text = 'text',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export interface IQueryFindAllArticles {
  title?: string;
  offset: number;
  limit: number;
  order: OrderType;
  orderBy: keyof IArticle;
}
