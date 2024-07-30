import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { IUser } from 'src/modules/user/interfaces/user.interfaces';
import { Article } from './article.schema';
import { v4 as uuidv4 } from 'uuid';

@Table
export class User extends Model<IUser> {
  @Column({ defaultValue: uuidv4(), primaryKey: true })
  id: string;

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
