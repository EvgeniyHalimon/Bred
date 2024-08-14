// libraries
import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// schemas
import Article from 'src/article/article.schema';
import User from 'src/user/user.schema';
import Comment from 'src/comment/comment.schema';

// types
import { IReactions } from './reaction.types';
import { PartialExcept } from 'src/shared/types';

// constants
import { SourceTypeEnum, ReactionTypeEnum } from './reaction.constants';

@Table({ tableName: 'reactions' })
export default class Reaction extends Model<
  PartialExcept<IReactions, 'id' | 'createdAt' | 'updatedAt'>
> {
  @Column({ defaultValue: uuidv4(), primaryKey: true, type: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column({
    type: DataType.ENUM(...Object.values(SourceTypeEnum)),
    allowNull: false,
  })
  sourceType: SourceTypeEnum;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  @ForeignKey(() => Article)
  articleId: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  @ForeignKey(() => Comment)
  commentId: string;

  @Column({
    type: DataType.ENUM(...Object.values(ReactionTypeEnum)),
    allowNull: false,
  })
  reactionType: ReactionTypeEnum;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsTo(() => Article, { foreignKey: 'articleId', constraints: false })
  article: Article;

  @BelongsTo(() => Comment, { foreignKey: 'commentId', constraints: false })
  comment: Comment;

  @BelongsTo(() => User, 'userId')
  user: User;
}
