import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../user/schema/user.schema';
import { Article } from 'src/articles/schema/article.schema';
import { Comment } from 'src/comments/schema/comment.schema';

@Table
export class Reaction extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column({
    type: DataType.ENUM('Article', 'Comment'),
    allowNull: false,
  })
  sourceType: 'Article' | 'Comment';

  @Column
  sourceId: string;

  @Column({
    type: DataType.ENUM('upvote', 'downvote', 'like', 'dislike'),
    allowNull: false,
  })
  reactionType: 'upvote' | 'downvote' | 'like' | 'dislike';

  @BelongsTo(() => Article, { foreignKey: 'sourceId', constraints: false })
  article: Article;

  @BelongsTo(() => Comment, { foreignKey: 'sourceId', constraints: false })
  comment: Comment;
}
