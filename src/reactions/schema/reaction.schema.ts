import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Article } from '../../articles/schema/article.schema';
import { User } from '../../user/schema/user.schema';

@Table
export class Reaction extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @Column
  reactionType: 'upvote' | 'downvote' | 'like' | 'dislike';
}
