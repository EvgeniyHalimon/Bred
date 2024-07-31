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
import { PartialExcept } from 'src/utils/types';

@Table
export class Article extends Model<IArticle, PartialExcept<IArticle, 'id'>> {
  @Column({ defaultValue: uuidv4(), primaryKey: true })
  id: string;

  @Column
  title: string;

  @Column({ defaultValue: 0 })
  rating: number;

  @ForeignKey(() => User)
  @Column
  author: User;

  @BelongsToMany(() => User, 'upvotes')
  upvoters: User[];

  @BelongsToMany(() => User, 'downvotes')
  downvoters: User[];

  @Column
  text: string;
}
