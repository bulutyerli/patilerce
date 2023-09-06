import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/db-config/db-config';
import Answer from '@/models/answers-model';
import User from '@/models/user-model';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { answerId } = reqBody;

    const answer = await Answer.findById(answerId);
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('There is no user');
    }

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (user.id.toString() !== answer.user._id.toString()) {
      throw new Error('Forbidden');
    }

    await Answer.deleteOne({ _id: answer.id });

    return NextResponse.json(
      { message: 'Question successfully deleted' },
      { success: true }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}
