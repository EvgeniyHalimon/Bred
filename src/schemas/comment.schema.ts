import {
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.schema';
import { IArticle } from 'src/modules/articles/interfaces/article.interfaces';

@Table
export class Comment extends Model<IArticle> {
  @Column({ defaultValue: uuidv4(), primaryKey: true })
  id: string;

  @ForeignKey(() => User)
  @Column
  author: User;

  @BelongsToMany(() => User, 'likes')
  likes: User[];

  @BelongsToMany(() => User, 'dislikes')
  dislikes: User[];

  @Column
  text: string;
}
