import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Article } from '../../articles/schema/article.schema';
import { Comment } from '../../comments/schema/comment.schema';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'src/user/interfaces/user.interfaces';
import { PartialExcept } from 'src/shared/types';

@Table({ tableName: 'users' })
export class User extends Model<IUser, PartialExcept<IUser, 'id'>> {
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

  @HasMany(() => Comment)
  comments: Comment[];
}
