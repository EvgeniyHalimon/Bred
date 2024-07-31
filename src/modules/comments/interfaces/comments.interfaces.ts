export interface IComment {
  id: string;
  authorId: string;
  text: string;
}

export interface IReactions {
  userId: string;
  commentId: string;
}
