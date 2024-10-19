import { v4 as uuidv4 } from 'uuid';
import { db } from './db';

export interface User {
  id?: string;
  email: string;
  name: string;
  password: string; // In a real app, never store plain text passwords
  subscriptionPlan: 'free' | 'basic' | 'premium';
  profilePicture: string;
  businessName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export const signup = async (
  email: string,
  name: string,
  password: string,
  businessName: string
): Promise<AuthResponse> => {
  const existingUser = await db.users.where('email').equals(email).first();

  if (existingUser) {
    return { success: false, message: 'User with this email already exists' };
  }

  const newUser: User = {
    id: uuidv4(),
    email,
    name,
    password, // In a real app, hash the password before storing
    subscriptionPlan: 'free',
    profilePicture: '', // You can set a default profile picture URL here
    businessName
  };

  await db.users.add(newUser);

  return { success: true, message: 'Signup successful', user: newUser };
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await db.users.where('email').equals(email).first();

  if (user && user.password === password) {
    return { success: true, message: 'Login successful', user };
  }

  return { success: false, message: 'Invalid email or password' };
};

export const logout = (): void => {
  // You might want to clear some session data here
};

export const getCurrentUser = async (): Promise<User | null> => {
  // In a real app, you'd use a session mechanism here
  // For now, we'll just return the first user (if any)
  return await db.users.toCollection().first() || null;
};

export const updateUser = async (updatedUser: User): Promise<AuthResponse> => {
  if (!updatedUser.id) {
    return { success: false, message: 'User ID is required for update' };
  }

  await db.users.update(updatedUser.id, updatedUser);
  return { success: true, message: 'User updated successfully', user: updatedUser };
};