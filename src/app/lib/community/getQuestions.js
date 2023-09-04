import connectDB from '@/dbConfig/dbConfig';
import Question from '@/models/questionsModel';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';
export const revalidate = 1;

export async function getQuestions(req, limit) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const { page = 1, filter } = req.query;
    const skip = (page - 1) * limit;
    let query = {};
    const totalQuestions = await Question.countDocuments(query);
    const userQuestions = await Question.countDocuments({ user });

    let totalPages = Math.ceil(totalQuestions / limit);
    const userPages = Math.ceil(userQuestions / limit);

    if (page < 1 || page > totalPages) {
      throw new Error('Page not found');
    }

    if (filter === 'my') {
      query = { user: user._id };
      totalPages = userPages;
    }

    console.log(totalPages);

    const questions = await Question.find(query)
      .populate({
        path: 'user',
        model: User,
        select: 'name image ',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return { questions, totalPages };
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
