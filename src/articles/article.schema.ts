// libraries
import {
  BelongsTo,
  BelongsToMany,
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

// types
import { PartialExcept } from 'src/shared';
import { IArticle } from './article.types';

// constants
import { SourceTypeEnum } from 'src/reactions/reaction.constants';
import Comment from 'src/comments/comment.schema';

@Table({ tableName: 'articles' })
export default class Article extends Model<
  IArticle,
  PartialExcept<IArticle, 'id' | 'rating' | 'createdAt' | 'updatedAt'>
> {
  @Column({
    defaultValue: () => uuidv4(),
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @Column
  title: string;

  @Column({ defaultValue: 0, type: DataType.INTEGER })
  rating: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  authorId: string;

  @Column
  text: string;

  @CreatedAt
  @Column({ type: DataType.NOW })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.NOW })
  updatedAt: Date;

  @BelongsTo(() => User, 'authorId')
  author: User;

  @BelongsToMany(() => User, () => Reaction)
  upvoters: User[];

  @BelongsToMany(() => User, () => Reaction)
  downvoters: User[];

  @HasMany(() => Reaction, {
    foreignKey: 'articleId',
    constraints: false,
    scope: { sourceType: SourceTypeEnum.ARTICLE },
    onDelete: 'CASCADE',
  })
  reactions: Reaction[];

  @HasMany(() => Comment, {
    foreignKey: 'articleId',
    constraints: false,
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
