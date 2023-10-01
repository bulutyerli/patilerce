import Answer from '@/models/answers-model';
import User from '@/models/user-model';

export async function getAnswers(refQuestion) {
  try {
    const answers = await Answer.find({
      refQuestion: refQuestion,
      isApproved: true,
    })
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
      isApproved: true,
    });
    return totalAnswers;
  } catch (error) {
    return console.error(error);
  }
}
