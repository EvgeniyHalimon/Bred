// library
import { IsOptional, IsString } from 'class-validator';

// types
import { OrderType } from 'src/shared/types';
import { IArticle } from '../article.types';

export class GetAllQueryArticlesDto {
  @IsString()
  @IsOptional()
  readonly authorId?: string;

  @IsString()
  @IsOptional()
  readonly page?: string;

  @IsString()
  @IsOptional()
  readonly limit?: string;

  @IsOptional()
  readonly order?: OrderType;

  @IsOptional()
  readonly orderBy?: keyof IArticle;

  @IsString()
  @IsOptional()
  readonly title?: string;

  toWhereOption?() {
    return this.title && this.authorId
      ? { title: this.title, authorId: this.authorId }
      : this.authorId
        ? { authorId: this.authorId }
        : this.title
          ? { title: this.title }
          : {};
  }

  toPaginationOptions?() {
    return {
      limit: this.limit ? Number(this.limit) : 10,
      offset: this.page
        ? (Number(this.page) - 1) * (this.limit ? Number(this.limit) : 10)
        : 0,
      order: [
        [this.orderBy ?? 'createdAt', this.order ?? 'DESC'] as [
          keyof IArticle,
          OrderType,
        ],
      ],
    };
  }
}
