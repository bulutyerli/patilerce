import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import Question from '@/models/questionsModel';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { title, question, userId } = reqBody;

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
    const reqBody = await req.json();
    const { userId, questionId } = reqBody;

    const user = await User.findById(userId);
    const question = await Question.findById(questionId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { error: 400 });
    }

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { error: 400 });
    }

    if (user._id.toString() !== question.user.toString()) {
      return NextResponse.json({ error: 'Forbidden' }, { error: 500 });
    }

    await Question.deleteOne({ _id: questionId });

    return NextResponse.json(
      { message: 'Question successfully deleted' },
      { success: true }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
