import Answer from '@/models/answersModel';
import User from '@/models/userModel';

export async function getAnswers(refQuestion) {
  try {
    const answers = await Answer.find({ refQuestion: refQuestion }).populate({
      path: 'user',
      model: User,
      select: 'name image',
    });

    return { answers };
  } catch (error) {
    throw error;
  }
}
