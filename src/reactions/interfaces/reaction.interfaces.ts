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

export type ReactionType =
  | ReactionTypeEnum.UPVOTE
  | ReactionTypeEnum.DOWNVOTE
  | ReactionTypeEnum.LIKE
  | ReactionTypeEnum.DISLIKE;

export type SourceType = SourceTypeEnum.ARTICLE | SourceTypeEnum.COMMENT;

export enum ReactionTypeEnum {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export enum SourceTypeEnum {
  ARTICLE = 'article',
  COMMENT = 'comment',
}
