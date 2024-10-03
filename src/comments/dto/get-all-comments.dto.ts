// library
import { IsOptional, IsString } from 'class-validator';

// types
import { IComment } from '../comment.types';

// dtos
import {
  PaginationQuery,
  TransformToPagination,
} from 'src/shared/paginationDto';

export class GetAllCommentsDto extends PaginationQuery<IComment> {
  @IsString()
  @IsOptional()
  readonly text?: string;
}

export class GetAllCommentsOptions {
  constructor(private readonly dto: GetAllCommentsDto) {}

  toWhereCondition() {
    const { text } = this.dto;
    return text ? { text } : {};
  }

  toPaginationOptions() {
    return new TransformToPagination<IComment>(this.dto).toPaginationOptions();
  }
}
