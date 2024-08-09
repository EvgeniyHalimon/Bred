// library
import { IsUUID } from 'class-validator';

export class DeleteArticleDto {
  @IsUUID(4, { message: 'The provided ID is not a valid' })
  readonly userId: string;
  @IsUUID(4, { message: 'The provided ID is not a valid' })
  readonly articleId: string;
}
