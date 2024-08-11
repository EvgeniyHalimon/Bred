// library
import { IsUUID } from 'class-validator';

export class GetArticleDto {
  @IsUUID(4, { message: 'The provided ID is not a valid' })
  readonly articleId: string;
}
