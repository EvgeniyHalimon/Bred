// library
import { IsOptional, IsString } from 'class-validator';

// types
import { IArticle } from '../article.types';
import {
  PaginationQuery,
  TransformToPagination,
} from 'src/shared/paginationDto';

export class GetAllArticlesDto extends PaginationQuery<IArticle> {
  @IsString()
  @IsOptional()
  readonly authorId?: string;

  @IsString()
  @IsOptional()
  readonly title?: string;
}

export class GetAllArticlesOptions {
  constructor(private readonly dto: GetAllArticlesDto) {}

  toWhereOption() {
    const { title, authorId } = this.dto;
    return title && authorId
      ? { title, authorId }
      : authorId
        ? { authorId }
        : title
          ? { title }
          : {};
  }

  toPaginationOptions() {
    return new TransformToPagination<IArticle>(this.dto).toPaginationOptions();
  }
}
