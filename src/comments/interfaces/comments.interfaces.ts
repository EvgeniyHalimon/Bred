export interface IComment {
  id: string;
  authorId: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}
