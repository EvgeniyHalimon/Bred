// library
import { IsOptional, IsUUID } from 'class-validator';

// types
import { OrderType } from 'src/shared/types';
import { IReactions } from '../reaction.types';

export class GetAllQueryReactionsDto {
  @IsOptional()
  @IsUUID(4)
  readonly commentId?: string;

  @IsOptional()
  @IsUUID(4)
  readonly articleId?: string;

  @IsOptional()
  readonly page?: number;

  @IsOptional()
  readonly limit?: number;

  @IsOptional()
  readonly order?: OrderType;

  @IsOptional()
  readonly orderBy?: keyof IReactions;

  toWhereCondition() {
    return this.articleId
      ? { articleId: this.articleId }
      : this.commentId
        ? { commentId: this.commentId }
        : {};
  }

  toPaginationOptions() {
    return {
      limit: this.limit ? Number(this.limit) : 10,
      offset: this.page
        ? (Number(this.page) - 1) * (this.limit ? Number(this.limit) : 10)
        : 0,
      order: [
        [this.orderBy ?? 'createdAt', this.order ?? 'DESC'] as [
          keyof IReactions,
          OrderType,
        ],
      ],
    };
  }
}
