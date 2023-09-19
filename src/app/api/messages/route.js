import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/app/config/db-config';
import Conversation from '@/models/conversation-model';
import Message from '@/models/message-model';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(req) {
  const reqBody = await req.json();
  const { receiverId, content } = reqBody;
  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return NextResponse.json({
      error: 'Forbidden',
    });
  }

  // ...
  if (!receiverId) {
    return NextResponse.json({
      error: 'No Receiver',
    });
  }

  // Check if a conversation already exists between the users
  const conversation = await Conversation.findOne({
    participants: { $all: [loggedInUser._id, receiverId] },
  });

  if (conversation) {
    const newMessage = new Message({
      sender: loggedInUser._id,
      receiver: receiverId,
      content: content,
    });

    await newMessage.save();

    conversation.messages.push(newMessage);

    try {
      await conversation.save();
      return NextResponse.json({ conversation, success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Could not send the message' });
    }
  } else {
    const newMessage = new Message({
      sender: loggedInUser._id,
      receiver: receiverId,
      content: content,
    });

    await newMessage.save();

    // Create a new conversation if one doesn't exist
    const conversation = new Conversation({
      participants: [loggedInUser._id, receiverId],
      messages: [newMessage],
    });

    try {
      const savedConversation = await conversation.save();
      return NextResponse.json({
        conversation: savedConversation,
        success: true,
      });
    } catch (error) {
      return NextResponse.json({
        error: 'An error occurred while creating the conversation.',
      });
    }
  }
}
