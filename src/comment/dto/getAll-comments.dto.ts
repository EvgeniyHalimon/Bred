// library
import { IsOptional, IsString } from 'class-validator';

// types
import { IComment } from '../comment.types';
import { OrderType } from 'src/shared/types';

export class GetAllQueryCommentsDto {
  @IsString()
  @IsOptional()
  readonly text?: string;

  @IsString()
  @IsOptional()
  readonly page?: string;

  @IsString()
  @IsOptional()
  readonly limit?: string;

  @IsOptional()
  readonly order?: OrderType;

  @IsOptional()
  readonly orderBy?: keyof IComment;

  toWhereCondition?() {
    return this.text ? { text: this.text } : {};
  }

  toPaginationOptions?() {
    return {
      limit: this.limit ? Number(this.limit) : 10,
      offset: this.page
        ? (Number(this.page) - 1) * (this.limit ? Number(this.limit) : 10)
        : 0,
      order: [
        [this.orderBy ?? 'createdAt', this.order ?? 'DESC'] as [
          keyof IComment,
          OrderType,
        ],
      ],
    };
  }
}
