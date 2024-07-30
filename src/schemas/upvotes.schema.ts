import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Article } from './article.schema';
import { User } from './user.schema';

@Table
export class Upvote extends Model<Upvote> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Article)
  @Column
  articleId: string;
}
