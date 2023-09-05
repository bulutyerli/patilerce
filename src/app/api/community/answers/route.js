import Answer from '@/models/answersModel';
import User from '@/models/userModel';
import Question from '@/models/questionsModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { answer, userId, refQuestion } = reqBody;
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
