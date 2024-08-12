// libraries
import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

// schemas
import Reaction from 'src/reaction/reaction.schema';
import User from 'src/user/user.schema';

// types
import { PartialExcept } from 'src/shared/types';
import { IArticle } from './article.types';

// constants
import { SourceTypeEnum } from 'src/reaction/reaction.constants';

@Table({ tableName: 'articles' })
export default class Article extends Model<
  IArticle,
  PartialExcept<IArticle, 'id' | 'rating' | 'createdAt' | 'updatedAt'>
> {
  @Column({ defaultValue: uuidv4(), primaryKey: true, type: DataType.UUIDV4 })
  id: string;

  @Column
  title: string;

  @Column({ defaultValue: 0, type: DataType.INTEGER })
  rating: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  authorId: string;

  @Column
  text: string;

  @CreatedAt
  @Column({ type: DataType.NOW })
  createdAt: Date;

  @UpdatedAt
  @Column({ type: DataType.NOW })
  updatedAt: Date;

  @BelongsTo(() => User, 'authorId')
  author: User;

  @BelongsToMany(() => User, () => Reaction)
  upvoters: User[];

  @BelongsToMany(() => User, () => Reaction)
  downvoters: User[];

  @HasMany(() => Reaction, {
    foreignKey: 'sourceId',
    constraints: false,
    scope: { sourceType: SourceTypeEnum.ARTICLE },
  })
  reactions: Reaction[];
}
