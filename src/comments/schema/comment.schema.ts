// libraries
import {
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
import { Reaction } from 'src/reactions/schema/reaction.schema';
import { User } from 'src/user/schema/user.schema';

// types
import { SourceTypeEnum } from 'src/reactions/interfaces/reaction.interfaces';
import { IComment } from '../interfaces/comments.interfaces';
import { PartialExcept } from 'src/shared/types';

@Table({ tableName: 'comments' })
export class Comment extends Model<IComment, PartialExcept<IComment, 'id'>> {
  @Column({ defaultValue: uuidv4(), primaryKey: true, type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUIDV4)
  authorId: string;

  @BelongsToMany(() => User, () => Reaction)
  likes: User[];

  @BelongsToMany(() => User, () => Reaction)
  dislikes: User[];

  @Column(DataType.TEXT)
  text: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Reaction, {
    foreignKey: 'sourceId',
    constraints: false,
    scope: { sourceType: SourceTypeEnum.COMMENT },
  })
  reactions: Reaction[];
}
