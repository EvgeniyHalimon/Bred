// library
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

// types
import { OrderType } from 'src/shared/types';
import { IReactions } from '../reaction.types';

export class GetAllQueryReactionsDto {
  @IsUUID(4)
  @IsOptional()
  readonly commentId?: string;

  @IsUUID(4)
  @IsOptional()
  readonly articleId?: string;

  @IsNumber()
  @IsOptional()
  readonly page?: number;

  @IsNumber()
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
