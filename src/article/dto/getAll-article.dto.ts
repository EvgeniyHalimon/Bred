// library
import { IsOptional, IsString } from 'class-validator';

// types
import { OrderType } from 'src/shared/types';
import { IArticle } from '../article.types';

export class GetAllQueryArticlesDto {
  @IsOptional()
  readonly page?: number;

  @IsOptional()
  readonly limit?: number;

  @IsOptional()
  readonly order?: OrderType;

  @IsOptional()
  readonly orderBy?: keyof IArticle;

  @IsOptional()
  @IsString()
  readonly title?: string;

  toWhereOption() {
    return this.title ? { title: this.title } : {};
  }

  toPaginationOptions() {
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