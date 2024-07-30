import { IsString } from 'class-validator';
import { IUser } from 'src/modules/user/interfaces/user.interfaces';

export class CreateUserDto {
  readonly author: IUser;
  readonly likes: IUser;
  readonly dislikes: IUser;
  @IsString()
  readonly text: string;
}
