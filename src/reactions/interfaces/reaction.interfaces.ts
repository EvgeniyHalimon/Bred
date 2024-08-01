export interface IUser {
  userId: string;
  sourceId: string;
  reactionType: ReactionType;
  sourceType: SourceType;
}

export type ReactionType = 'upvote' | 'downvote' | 'like' | 'dislike';
export type SourceType = 'article' | 'comment';

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
