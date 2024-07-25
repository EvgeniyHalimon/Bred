import { Document } from 'mongoose';

export interface ICat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
