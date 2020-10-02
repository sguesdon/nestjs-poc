import { AbstractSchema } from '../core/data';

export const AccountsSchema = new AbstractSchema({
  name: String,
  age: Number,
  breed: String,
});
