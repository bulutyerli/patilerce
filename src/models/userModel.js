import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, 'Full name should be atleast 4 characters long'],
      maxLength: [20, 'Full name should be less than 20 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]/,
        'Invalid email address',
      ],
    },
    password: String,
    image: String,
    role: {
      type: String,
      default: 'user',
    },
    provider: {
      type: String,
      default: 'credentials',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },

  { timestamps: true }
);

const User = models.user || model('user', userSchema);

export default User;
