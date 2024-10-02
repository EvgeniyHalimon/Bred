// library
import { IsOptional, IsUUID } from 'class-validator';

// types
import { IReactions } from '../reaction.types';
import {
  PaginationQuery,
  TransformToPagination,
} from 'src/shared/paginationDto';

export class GetAllReactionsDto extends PaginationQuery<IReactions> {
  @IsUUID(4)
  @IsOptional()
  readonly commentId?: string;

  @IsUUID(4)
  @IsOptional()
  readonly articleId?: string;
}

export class GetAllReactionsOptions {
  constructor(private readonly dto: GetAllReactionsDto) {}

  toWhereCondition() {
    const { articleId, commentId } = this.dto;
    return articleId ? { articleId } : commentId ? { commentId } : {};
  }

  toPaginationOptions() {
    return new TransformToPagination<IReactions>(
      this.dto,
    ).toPaginationOptions();
  }
}
