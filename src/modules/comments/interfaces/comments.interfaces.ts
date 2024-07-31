export interface IComment {
  id: string;
  authorId: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReactions {
  userId: string;
  commentId: string;
}
