// constant
import { ReactionTypeEnum, SourceTypeEnum } from './reaction.constants';

export interface IReactions {
  id: string;
  userId: string;
  commentId?: string;
  articleId?: string;
  reactionType: ReactionType;
  sourceType: SourceType;
  createdAt: Date;
  updatedAt: Date;
}

export enum ReactionOrderByEnum {
  id = 'id',
  userId = 'userId',
  commentId = 'commentId',
  articleId = 'articleId',
  reactionType = 'reactionType',
  sourceType = 'sourceType',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export type ReactionType =
  | ReactionTypeEnum.UPVOTE
  | ReactionTypeEnum.DOWNVOTE
  | ReactionTypeEnum.LIKE
  | ReactionTypeEnum.DISLIKE;

export type SourceType = SourceTypeEnum.ARTICLE | SourceTypeEnum.COMMENT;
