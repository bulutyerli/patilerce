import connectDB from '@/db-config/db-config';
import User from '@/models/user-model';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { checkValidPassword } from '@/helpers/check-valid-password';

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, currentPassword, newPassword } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (!checkValidPassword(newPassword)) {
      return NextResponse.json(
        { error: 'Password not strong enough' },
        { status: 422 }
      );
    }

    const passwordMatch = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedNewPassword;

    await user.save();

    return NextResponse.json({
      message: 'Your password successfully changed',
      success: true,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}
