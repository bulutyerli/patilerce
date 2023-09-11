import User from '@/models/user-model';
import connectDB from '@/app/config/db-config';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { checkValidPassword } from '@/helpers/check-valid-password';
import checkValidEmail from '@/helpers/check-valid-email';
import { sendEmail } from '@/helpers/mailer';

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    } else {
      if (!checkValidPassword(password)) {
        return NextResponse.json(
          {
            error:
              'Password must be minumum 6 characters with min a number and a special character',
          },
          { status: 409 }
        );
      }

      if (!checkValidEmail(email)) {
        return NextResponse.json(
          { error: 'Email is not valid' },
          { status: 409 }
        );
      }
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      //Sending verification email

      await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

      return NextResponse.json({
        message: 'User created successfully',
        success: true,
        savedUser,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
