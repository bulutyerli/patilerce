import mongoose, { Schema, model, models } from 'mongoose';

const conversationSchema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }],
    deletedBy: [],
  },

  { timestamps: true }
);

const Conversation =
  models.conversation || model('conversation', conversationSchema);

export default Conversation;
