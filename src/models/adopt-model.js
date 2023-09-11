import { Schema, model, models } from 'mongoose';

const adoptSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [30, 'Title should be less than 50 characters'],
      unique: false,
    },
    details: {
      type: String,
      required: true,
      maxLength: [300, 'Title should be less than 50 characters'],
      unique: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
      unique: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    petType: {
      type: String,
      required: true,
      enum: ['Dog', 'Cat'],
      unique: false,
    },
    breed: {
      type: String,
      required: true,
      unique: false,
    },
    age: {
      type: String,
      required: true,
      unique: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
      unique: false,
    },
    images: {
      type: Array,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Adopt = models.adopt || model('adopt', adoptSchema);

export default Adopt;
