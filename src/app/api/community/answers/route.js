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
      throw new Error('User or question');
    }

    const existingAnswer = await Answer.findOne({ answer });

    if (existingAnswer) {
      throw new Error('Duplicate answer found');
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
    throw error;
  }
}
