import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.schema';
import { Comment } from './comment.schema';
import { IReactions } from 'src/modules/comments/interfaces/comments.interfaces';

@Table
export class Likes extends Model<IReactions> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Comment)
  @Column
  commentId: string;
}
