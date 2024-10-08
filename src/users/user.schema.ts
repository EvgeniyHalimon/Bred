// libraries
import {
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// schema
import Article from 'src/articles/article.schema';
import Comment from 'src/comments/comment.schema';
import Reaction from 'src/reactions/reaction.schema';

// types
import { IUser } from 'src/users/user.types';
import { PartialExcept } from 'src/shared/types';

// constants
import { UserRolesEnum } from './user.constants';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ['password'] },
  },
}))
@Table({ tableName: 'users' })
export default class User extends Model<
  IUser,
  PartialExcept<IUser, 'id' | 'role' | 'createdAt' | 'updatedAt'>
> {
  @Column({
    defaultValue: () => uuidv4(),
    primaryKey: true,
    type: DataType.UUIDV4,
  })
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

  @Column({ type: DataType.TEXT, allowNull: true })
  photo: string | null;

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
