import { IUser, Order } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('User already exists!!!');
  }

  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select('-userId -isActive -hobbies');
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const getUpdateUserFromDB = async (userId: string, updatedData: IUser) => {
  try {
    const result = await User.findOneAndUpdate({ userId }, updatedData, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Rethrow or handle accordingly based on your use case
  }
};

const deleteUserFromDB = async (userId: string) => {
  try {
    const result = await User.findOneAndDelete({ userId });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addAndUpdateOrderUserDB = async (userId: string, newOrder: Order) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $push: { orders: newOrder } },
      { new: true },
    );

    if (updatedUser) {
      return newOrder;
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserOrdersFromDB = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });
    if (user) {
      const orders = user.orders;
      return orders;
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateTotalPriceFromDB = async (userId: string) => {
  try {
    const user = await User.findOne({ userId });

    if (user) {
      if (user.orders && user.orders.length > 0) {
        const totalPrice = user.orders.reduce(
          (total, order) => total + order.price * order.quantity,
          0,
        );
        return { totalPrice: totalPrice.toFixed(2) };
      } else {
        console.log(`${userId} has no orders.`);
      }
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.log(error);
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getUpdateUserFromDB,
  deleteUserFromDB,
  addAndUpdateOrderUserDB,
  getUserOrdersFromDB,
  calculateTotalPriceFromDB,
};
