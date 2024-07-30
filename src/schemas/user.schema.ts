import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { IUser } from 'src/modules/user/interfaces/user.interfaces';
import { Article } from './article.schema';

@Table
export class User extends Model<IUser> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: '' })
  bio: string;

  @Column({ defaultValue: '' })
  photo: string;

  @HasMany(() => Article)
  articles: Article[];
}
