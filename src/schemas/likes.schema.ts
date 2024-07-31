import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.schema';
import { Comment } from './comment.schema';

@Table
export class Likes extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Comment)
  @Column
  commentId: string;
}
