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
import { SourceTypeEnum } from 'src/reactions/interfaces/reaction.interfaces';
import { Reaction } from 'src/reactions/schema/reaction.schema';
import { PartialExcept } from 'src/shared/types';
import { User } from 'src/user/schema/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { IComment } from '../interfaces/comments.interfaces';

@Table({ tableName: 'comments' })
export class Comment extends Model<IComment, PartialExcept<IComment, 'id'>> {
  @Column({ defaultValue: uuidv4(), primaryKey: true, type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  authorId: string;

  @BelongsToMany(() => User, () => Reaction)
  likes: User[];

  @BelongsToMany(() => User, () => Reaction)
  dislikes: User[];

  @Column(DataType.TEXT)
  text: string;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Reaction, {
    foreignKey: 'sourceId',
    constraints: false,
    scope: { sourceType: SourceTypeEnum.COMMENT },
  })
  reactions: Reaction[];
}
