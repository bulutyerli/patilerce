import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import Answer from '@/models/answers-model';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

connectDB();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.isAdmin;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' });
    }

    const answers = await Answer.find({ isApproved: false }).populate({
      path: 'user',
      model: User,
      select: 'name email _id',
    });
    return NextResponse.json({ answers, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { answerId, action } = reqBody;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return NextResponse.json({
        error: 'Could not get the answer',
        success: false,
      });
    }

    if (action === 'approve') {
      answer.isApproved = true;
      await answer.save();
      return NextResponse.json({ success: true });
    }
    if (action === 'reject') {
      await Answer.deleteOne({ _id: answerId });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
