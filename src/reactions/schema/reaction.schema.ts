import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../user/schema/user.schema';
import { Comment } from '../../comments/schema/comment.schema';
import { Article } from '../../articles/schema/article.schema';
import {
  SourceTypeEnum,
  ReactionTypeEnum,
} from '../interfaces/reaction.interfaces';

@Table({ tableName: 'reactions' })
export class Reaction extends Model {
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
