import User from '@/models/userModel';
import connectDB from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { checkValidPassword } from '@/helpers/checkValidPassword';
import checkValidEmail from '@/helpers/checkValidEmail';

export async function POST(request) {
  await connectDB();

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
