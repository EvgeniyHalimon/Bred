export interface IUser {
  userId: string;
  sourceId: string;
  reactionType: ReactionType;
  sourceType;
}

export type ReactionType = 'upvote' | 'downvote' | 'like' | 'dislike';
export type SourceType = 'upvote' | 'downvote' | 'like' | 'dislike';
