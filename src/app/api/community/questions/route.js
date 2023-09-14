import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import Question from '@/models/questions-model';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

connectDB();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { title, question } = reqBody;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (title.length < 4) {
      return NextResponse.json({
        error: 'Title must be more than 4 letters',
      });
    }

    if (question.length < 10) {
      return NextResponse.json({
        error: 'Question must be longer than 10 letters',
      });
    }

    const newQuestion = new Question({
      title: title,
      question: question,
      user: user._id,
    });

    await newQuestion.save();

    return NextResponse.json({
      message: 'Question successfully added',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { dataId } = reqBody;

    const user = await User.findById(userId);
    const question = await Question.findById(dataId);

    if (!user) {
      console.log('no user');
      throw new Error('There is no user');
    }

    if (!question) {
      console.log('no question');

      throw new Error('Question not found');
    }

    if (user.id.toString() !== question.user._id.toString()) {
      throw new Error('Forbidden');
    }

    await Question.deleteOne({ _id: dataId });

    return NextResponse.json({
      message: 'Question successfully deleted',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { questionId, updatedQuestion } = reqBody;

    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user) {
      console.log('no user');

      throw new Error('There is no user');
    }

    if (!question) {
      console.log('No question exist');

      throw new Error('Question not found');
    }

    if (user.id.toString() !== question.user._id.toString()) {
      throw new Error('Forbidden');
    }

    await Question.findByIdAndUpdate(questionId, { question: updatedQuestion });

    return NextResponse.json(
      { message: 'Question successfully deleted' },
      { success: true }
    );
  } catch (error) {
    console.log(error.message);
  }
}
