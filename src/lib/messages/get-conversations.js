import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/app/config/db-config';
import Conversation from '@/models/conversation-model';
import { getServerSession } from 'next-auth';

connectDB();

export async function getConversations() {
  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return null;
  }

  try {
    const conversations = await Conversation.find({
      participants: loggedInUser._id,
    })
      .populate({
        path: 'participants',
        select: 'name image',
      })
      .populate('messages');

    return conversations;
  } catch (error) {
    console.log(error, 'Error');
    return null;
  }
}
