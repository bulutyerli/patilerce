import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import Question from '@/models/questions-model';
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

    const questions = await Question.find({ isApproved: false }).populate({
      path: 'user',
      model: User,
      select: 'name email _id',
    });
    return NextResponse.json({ questions, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { questionId, action } = reqBody;

    const question = await Question.findById(questionId);

    if (!question) {
      return NextResponse.json({
        error: 'Could not get the question',
        success: false,
      });
    }

    if (action === 'approve') {
      question.isApproved = true;
      await question.save();
      return NextResponse.json({ success: true });
    }
    if (action === 'reject') {
      await Question.deleteOne({ _id: questionId });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
