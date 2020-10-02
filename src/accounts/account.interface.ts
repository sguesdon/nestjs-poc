import { Document } from 'mongoose';

export interface Account extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
