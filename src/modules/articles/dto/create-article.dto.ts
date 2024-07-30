import { IsNumber, IsString } from 'class-validator';
import { IUser } from 'src/modules/user/interfaces/user.interfaces';

export class CreateArticleDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly rating: number;
  readonly author: IUser;
  readonly upvoters: IUser;
  readonly downvoters: IUser;
  @IsString()
  readonly text: string;
}
