import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { IComment } from 'src/modules/comments/interfaces/comments.interfaces';
import { PartialExcept } from 'src/utils/types';
import { Dislikes } from './dislikes.schema';
import { Likes } from './likes.schema';
import { User } from './user.schema';

@Table({ tableName: 'comments' })
export class Comment extends Model<IComment, PartialExcept<IComment, 'id'>> {
  @Column({ defaultValue: uuidv4(), primaryKey: true, type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  authorId: string;

  @BelongsToMany(() => User, () => Likes)
  likes: User[];

  @BelongsToMany(() => User, () => Dislikes)
  dislikes: User[];

  @Column(DataType.TEXT)
  text: string;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
