import connectDB from '@/dbConfig/dbConfig';
import Question from '@/models/questionsModel';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';

export const dynamic = 'force-dynamic';

export async function getQuestions(req, limit) {
  await connectDB();

  try {
    const { page = 1, filterBy } = req.query;

    const query = {};

    const skip = (page - 1) * limit;
    const questions = await Question.find()
      .populate({
        path: 'user',
        model: User,
        select: 'name image ',
      })
      .skip(skip)
      .limit(parseInt(limit));

    // Calculate the total number of questions
    const totalQuestions = await Question.countDocuments(query);
    return { questions, totalQuestions };
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
