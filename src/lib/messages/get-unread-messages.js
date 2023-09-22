import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/app/config/db-config';
import Message from '@/models/message-model';
import { getServerSession } from 'next-auth';

connectDB();

export async function getUnreadMessages() {
  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return null;
  }

  try {
    const query = {
      receiver: loggedInUser._id,
      readBy: { $nin: [loggedInUser._id] },
    };

    // Count the messages that match the query
    const messageCount = await Message.countDocuments(query);
    return messageCount;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return null; // or handle the error as needed
  }
}
