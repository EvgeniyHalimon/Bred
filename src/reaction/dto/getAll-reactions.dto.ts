// library
import {
  IsOptional,
  IsUUID,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// types
import { OrderType } from 'src/shared/types';
import { IReactions } from '../reaction.types';

@ValidatorConstraint({ name: 'atLeastOne', async: false })
export class AtLeastOne implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as GetAllQueryReactionsDto;
    return !!(object.commentId || object.articleId);
  }

  defaultMessage() {
    return 'Either commentId or articleId must be provided.';
  }
}

export class GetAllQueryReactionsDto {
  @IsOptional()
  @IsUUID(4)
  @ValidateIf(o => !o.articleId)
  @ValidateIf(() => false, { groups: ['atLeastOne'] })
  readonly commentId?: string;

  @IsOptional()
  @IsUUID(4)
  @ValidateIf(o => !o.commentId)
  @ValidateIf(() => false, { groups: ['atLeastOne'] })
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
