import Answer from '@/models/answersModel';
import User from '@/models/userModel';

export async function getAnswers(refQuestion) {
  try {
    const answers = await Answer.find({ refQuestion: refQuestion })
      .populate({
        path: 'user',
        model: User,
        select: 'name image',
      })
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    throw error;
  }
}

export async function getAnswersCount(refQuestion) {
  try {
    const totalAnswers = await Answer.countDocuments({
      refQuestion: refQuestion,
    });
    return totalAnswers;
  } catch (error) {
    return console.error(error);
  }
}
