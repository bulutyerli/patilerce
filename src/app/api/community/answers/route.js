import Answer from '@/models/answers-model';
import User from '@/models/user-model';
import Question from '@/models/questions-model';
import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db-config';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

connectDB();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { answer, refQuestion } = reqBody;
    const user = await User.findById(userId);
    const question = await Question.findById(refQuestion);

    if (!user || !question) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 400 });
    }

    /*    const existingAnswer = await Answer.findOne({ answer: answer.trim() });

    if (existingAnswer) {
      return NextResponse.json(
        { message: 'Oops! It looks like this answer already exists.' },
        { status: 409 }
      );
    }
 */
    if (answer.length < 4) {
      return NextResponse.json(
        {
          message: 'Your answer must be longer than 3 letters',
        },
        { status: 400 }
      );
    }

    const newAnswer = new Answer({
      answer: answer,
      user: user._id,
      refQuestion: question._id,
    });

    await newAnswer.save();

    return NextResponse.json(
      { message: 'Answer successfully added' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { dataId } = reqBody;

    const user = await User.findById(userId);
    const answer = await Answer.findById(dataId);

    if (!user) {
      console.log('no user');
      throw new Error('There is no user');
    }

    if (!answer) {
      console.log('no answer');

      throw new Error('Answer not found');
    }

    if (user.id.toString() !== answer.user._id.toString()) {
      throw new Error('Forbidden');
    }

    await Answer.deleteOne({ _id: dataId });

    return NextResponse.json({
      message: 'Answer successfully deleted',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
