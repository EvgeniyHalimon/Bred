import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Article } from './article.schema';
import { User } from './user.schema';

@Table
export class Downvote extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Article)
  @Column
  articleId: string;
}
