import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: 'User not exists' }, { status: 400 });
    }

    await sendEmail({ email, emailType: 'RESET', userId: user._id });

    return NextResponse.json({
      message: 'Password Change Email Has Been Sent',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
