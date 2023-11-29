import { Schema, model } from 'mongoose';
import { Address, FullName, IUser, Order, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../..';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  lastName: { type: String, required: [true, 'First Name is required'] },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<Order>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, 'UserId is required'],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'UserName is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: fullNameSchema,
    required: [true, 'UserFullName is required'],
    trim: true,
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'], trim: true },
  isActive: { type: Boolean, required: [true, 'IsActive is required'] },
  hobbies: [String, String],
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: [orderSchema],
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  // Exclude sensitive fields
  delete user.password;
  delete user.orders;
  delete user._id;
  delete user.__v;
  return user;
};

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
