import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';

connectDB();

export default async function getUser(userId) {
  try {
    const user = await User.findOne({ _id: userId });

    if (user) {
      const { name, image } = user;
      return { name, image };
    } else {
      return null; // User with the provided userId not found
    }
  } catch (error) {
    console.error(error);
    return null; // Handle any errors that occur during the database query
  }
}
