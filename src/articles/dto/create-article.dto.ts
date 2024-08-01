import { IsNumber, IsString } from 'class-validator';
import { IUser } from 'src/user/interfaces/user.interfaces';

export class CreateArticleDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly rating: number;
  @IsString()
  readonly authorId: string;
  readonly upvoters: IUser;
  readonly downvoters: IUser;
  @IsString()
  readonly text: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
