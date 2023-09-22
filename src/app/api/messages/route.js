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
      readBy: [loggedInUser._id],
    });

    await newMessage.save();

    conversation.messages.push(newMessage);
    conversation.deletedBy = [];

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
      readBy: [loggedInUser._id],
    });

    await newMessage.save();

    // Create a new conversation if one doesn't exist
    const conversation = new Conversation({
      participants: [loggedInUser._id, receiverId],
      messages: [newMessage],
      deletedBy: [],
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

export async function DELETE(req) {
  const reqBody = await req.json();
  const { dataId } = reqBody;
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  if (!userId) {
    return NextResponse.json({ error: 'user not found' });
  }

  const conversation = await Conversation.findById(dataId);
  //check if other user already deleted, then delete completely
  if (conversation.deletedBy.length > 0) {
    try {
      conversation.messages.forEach(async (message) => {
        await Message.deleteOne({ _id: message._id });
      });
      await Conversation.deleteOne({ _id: dataId });
    } catch (error) {
      console.log(error.message);
    }
    return NextResponse.json({ success: true });
  }

  // if the user first to delete, then add user id to deletedBy
  if (!conversation.deletedBy.includes(userId)) {
    conversation.deletedBy.push(userId);
    conversation.messages.forEach(async (message) => {
      const messagesToDelete = await Message.findById(message._id);
      if (messagesToDelete.deletedBy.length > 1) {
        await Message.deleteOne({ _id: message._id });
      } else if (!messagesToDelete.deletedBy.includes(userId)) {
        messagesToDelete.deletedBy.push(userId);
      }
      await messagesToDelete.save();
    });
  }

  try {
    const savedConversation = await conversation.save();
    return NextResponse.json({
      conversation: savedConversation,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
}
