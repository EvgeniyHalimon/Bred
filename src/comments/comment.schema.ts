// libraries
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// schemas
import Reaction from 'src/reactions/reaction.schema';
import User from 'src/users/user.schema';
import Article from 'src/articles/article.schema';

// types
import { SourceTypeEnum } from 'src/reactions/reaction.constants';
import { IComment } from './comment.types';
import { PartialExcept } from 'src/shared/types';

@Table({ tableName: 'comments' })
export default class Comment extends Model<
  IComment,
  PartialExcept<IComment, 'id'>
> {
  @Column({
    defaultValue: () => uuidv4(),
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUIDV4)
  authorId: string;

  @ForeignKey(() => Article)
  @Column(DataType.UUIDV4)
  articleId: string;

  @Column(DataType.TEXT)
  text: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Reaction, {
    foreignKey: 'commentId',
    constraints: false,
    scope: { sourceType: SourceTypeEnum.COMMENT },
    onDelete: 'CASCADE',
  })
  reactions: Reaction[];

  @BelongsTo(() => User, 'authorId')
  author: User;
}
