// library
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly rating: number;
  @IsString()
  @IsUUID(4)
  readonly authorId: string;
  @IsString()
  readonly text: string;
}
