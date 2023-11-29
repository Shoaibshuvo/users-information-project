import { Model } from 'mongoose';

export type FullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type IUser = {
  userId: number;
  username: string;
  fullName: FullName;
  password: string;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: [string, string];
  address: Address;
  orders?: Order[];
};

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<IUser | null>;
}
