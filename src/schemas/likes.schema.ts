import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.schema';
import { Comment } from './comment.schema';

@Table({ tableName: 'likes' })
export class Likes extends Model {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Comment)
  @Column(DataType.UUID)
  commentId: string;
}
