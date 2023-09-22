import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/app/config/db-config';
import Message from '@/models/message-model';
import { getServerSession } from 'next-auth';

connectDB();

export async function getMessages(otherUserId) {
  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return null; // or handle the unauthorized case as needed
  }

  try {
    // Find messages between the logged-in user and otherUserId
    const messages = await Message.find({
      $or: [
        { sender: loggedInUser._id, receiver: otherUserId },
        { sender: otherUserId, receiver: loggedInUser._id },
      ],
    });

    messages.forEach(async (message) => {
      if (!message.readBy.includes(loggedInUser._id)) {
        message.readBy.push(loggedInUser._id);
        await message.save();
      }
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return null; // or handle the error as needed
  }
}
