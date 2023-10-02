import connectDB from '@/app/config/db-config';
import Question from '@/models/questions-model';
import { NextResponse } from 'next/server';
import User from '@/models/user-model';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getAnswersCount } from './get-answers';

connectDB();

export const dynamic = 'force-dynamic';
export async function getQuestions(req, limit) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const { page = 1, filter } = req.query;
    const skip = (page - 1) * limit;
    let query = { isApproved: true };
    const totalQuestions = await Question.countDocuments(query);
    const userQuestions = await Question.countDocuments({ user });

    let totalPages = Math.ceil(totalQuestions / limit);
    const userPages = Math.ceil(userQuestions / limit);

    if (page < 1 || page > totalPages) {
      throw new Error('Page not found');
    }

    if (filter === 'my') {
      query = { ...query, user: user._id };
      totalPages = userPages;
    }

    if (filter === 'noanswer') {
      const questionId = await getQuestionsWithoutAnswers();
      query = { ...query, _id: { $in: questionId } };
    }

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

export async function getQuestionById(id) {
  try {
    const question = await Question.findById(id).populate({
      path: 'user',
      model: User,
      select: 'name image',
    });

    return { question };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getQuestionsWithoutAnswers() {
  const questions = await Question.find({});
  const questionsWithoutAnswers = [];

  for (const question of questions) {
    const answersCount = await getAnswersCount(question.id);
    if (answersCount === 0) {
      questionsWithoutAnswers.push(question.id);
    }
  }
  return questionsWithoutAnswers;
}

export async function getAllUserQuestions(req, limit) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { page = 1, filter } = req.query;
  const skip = (page - 1) * limit;
  let query = { user: user?._id, isApproved: true };
  const userQuestions = await Question.countDocuments({ user });
  const totalPages = Math.ceil(userQuestions / limit);

  if (filter === 'pending') {
    query = {
      user: user?._id,
      isApproved: false,
    };
  }
  try {
    const questions = await Question.find(query)
      .populate({
        path: 'user',
        model: User,
        select: 'name image ',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(10));
    return { questions, totalPages };
  } catch (error) {
    console.log(error);
  }
}
