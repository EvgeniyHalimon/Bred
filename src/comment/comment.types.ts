export interface IComment {
  id: string;
  authorId: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum CommentOrderByEnum {
  id = 'id',
  authorId = 'authorId',
  text = 'text',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
