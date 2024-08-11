// libraries
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// schema
import { Article } from 'src/article/article.schema';
import { Comment } from 'src/comment/comment.schema';
import { Reaction } from 'src/reaction/reaction.schema';

// types
import { IUser } from 'src/user/user.types';
import { PartialExcept } from 'src/shared/types';

// constants
import { UserRolesEnum } from './user.constants';

@Table({ tableName: 'users' })
export class User extends Model<
  IUser,
  PartialExcept<IUser, 'id' | 'role' | 'createdAt' | 'updatedAt'>
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

  @Column({
    type: DataType.ENUM(...Object.values(UserRolesEnum)),
    defaultValue: UserRolesEnum.USER,
  })
  role: UserRolesEnum;

  @Column({ type: DataType.BLOB, allowNull: true })
  photo: Buffer;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Article)
  articles: Article[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Reaction)
  reactions: Reaction[];
}
