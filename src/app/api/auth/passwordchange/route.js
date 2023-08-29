import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: 'Password successfully changed',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
