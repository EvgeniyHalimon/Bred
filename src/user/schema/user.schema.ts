import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'src/user/interfaces/user.interfaces';
import { PartialExcept } from 'src/shared/types';
import { Article } from 'src/articles/schema/article.schema';
import { Comment } from 'src/comments/schema/comment.schema';
import { Reaction } from 'src/reactions/schema/reaction.schema';

@Table({ tableName: 'users' })
export class User extends Model<
  IUser,
  PartialExcept<IUser, 'id' | 'createdAt' | 'updatedAt'>
> {
  @Column({ defaultValue: uuidv4(), primaryKey: true, type: DataType.UUIDV4 })
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

  @Column({ type: DataType.BLOB, allowNull: true })
  photo: Buffer;

  @HasMany(() => Article)
  articles: Article[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Reaction)
  reactions: Reaction[];
}
