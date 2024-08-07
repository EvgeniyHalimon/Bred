// libraries
import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// schemas
import { User } from '../../user/schema/user.schema';
import { Comment } from '../../comments/schema/comment.schema';
import { Article } from '../../articles/schema/article.schema';

// types
import {
  SourceTypeEnum,
  ReactionTypeEnum,
  IReactions,
} from '../interfaces/reaction.interfaces';
import { PartialExcept } from 'src/shared/types';

@Table({ tableName: 'reactions' })
export class Reaction extends Model<
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

  @BelongsTo(() => Article, { foreignKey: 'articleId', constraints: false })
  article: Article;

  @BelongsTo(() => Comment, { foreignKey: 'commentId', constraints: false })
  comment: Comment;
}
