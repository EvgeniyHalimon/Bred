import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../user/schema/user.schema';
import { SourceTypeEnum } from 'src/reactions/interfaces/reaction.interfaces';
import { Reaction } from 'src/reactions/schema/reaction.schema';
import { PartialExcept } from 'src/shared/types';
import { IArticle } from '../interfaces/article.interfaces';

@Table({ tableName: 'articles' })
export class Article extends Model<
  IArticle,
  PartialExcept<IArticle, 'id' | 'rating' | 'createdAt' | 'updatedAt'>
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

  @BelongsToMany(() => User, () => Reaction)
  upvoters: User[];

  @BelongsToMany(() => User, () => Reaction)
  downvoters: User[];

  @Column
  text: string;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Reaction, {
    foreignKey: 'sourceId',
    constraints: false,
    scope: { sourceType: SourceTypeEnum.ARTICLE },
  })
  reactions: Reaction[];
}
