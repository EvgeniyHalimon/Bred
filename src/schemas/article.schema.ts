import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.schema';
import { IArticle } from 'src/modules/articles/interfaces/article.interfaces';
import { PartialExcept } from 'src/utils/types';

@Table({ tableName: 'articles' })
export class Article extends Model<
  IArticle,
  PartialExcept<IArticle, 'id' | 'rating'>
> {
  @Column({ defaultValue: uuidv4(), primaryKey: true })
  id: string;

  @Column
  title: string;

  @Column({ defaultValue: 0 })
  rating: number;

  @ForeignKey(() => User)
  @Column
  authorId: string;

  @BelongsTo(() => User, 'id')
  author: User;

  @BelongsToMany(() => User, 'upvotes')
  upvoters: User[];

  @BelongsToMany(() => User, 'downvotes')
  downvoters: User[];

  @Column
  text: string;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
