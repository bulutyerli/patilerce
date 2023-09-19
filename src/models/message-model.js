import mongoose, { Schema, model, models } from 'mongoose';

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    content: String,
    sentAt: { type: Date, default: Date.now },
    receivedAt: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

const Message = models.message || model('message', messageSchema);

export default Message;
