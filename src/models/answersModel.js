import { Schema, model, models } from 'mongoose';

const answerShema = new Schema(
  {
    answer: {
      type: String,
      required: true,
      minLength: [4, 'Answer should be atleast 4 characters long'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },

  { timestamps: true }
);

const Answer = models.answer || model('answer', answerShema);

export default Answer;
