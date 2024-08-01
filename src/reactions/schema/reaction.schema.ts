import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../user/schema/user.schema';
import { Comment } from '../../comments/schema/comment.schema';
import { Article } from '../../articles/schema/article.schema';
import {
  SourceTypeEnum,
  ReactionTypeEnum,
} from '../interfaces/reaction.interfaces';

@Table
export class Reaction extends Model {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @Column({
    type: DataType.ENUM(...Object.values(SourceTypeEnum)),
    allowNull: false,
  })
  sourceType: SourceTypeEnum;

  @Column
  sourceId: string;

  @Column({
    type: DataType.ENUM(...Object.values(ReactionTypeEnum)),
    allowNull: false,
  })
  reactionType: ReactionTypeEnum;

  @BelongsTo(() => Article, { foreignKey: 'sourceId', constraints: false })
  article: Article;

  @BelongsTo(() => Comment, { foreignKey: 'sourceId', constraints: false })
  comment: Comment;
}
