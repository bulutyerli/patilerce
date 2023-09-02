import { Schema, model, models } from 'mongoose';

const questionsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [4, 'Title should be atleast 4 characters long'],
      maxLength: [50, 'Title should be less than 50 characters'],
    },
    question: {
      type: String,
      required: true,
      minLength: [10, 'Question should be atleast 4 characters long'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'answer',
    },
  },

  { timestamps: true }
);

const Question = models.question || model('question', questionsSchema);

export default Question;
