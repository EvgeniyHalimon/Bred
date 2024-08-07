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
import { User } from '../../user/schema/user.schema';
import { Reaction } from 'src/reactions/schema/reaction.schema';

// types
import { SourceTypeEnum } from 'src/reactions/interfaces/reaction.interfaces';
import { PartialExcept } from 'src/shared/types';
import { IArticle } from '../interfaces/article.interfaces';

@Table({ tableName: 'articles' })
export class Article extends Model<
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
