import { z } from 'zod';

// Define the Zod schema for FullName
const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'FirstName must be not more then 20 characters ' }),
  lastName: z.string(),
});

// Define the Zod schema for Address
const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// Define the Zod schema for Order
const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

// Define the Zod schema for User
const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.tuple([z.string(), z.string()]),
  address: addressValidationSchema,
  orders: z.optional(z.array(orderValidationSchema)),
});

export default userValidationSchema;
