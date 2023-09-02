import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, newName } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (newName.length < 3) {
      return NextResponse.json(
        { error: 'Name must be at least 4 letters' },
        { status: 422 }
      );
    }

    if (newName === user.name) {
      return NextResponse.json(
        { error: 'Name must be different than last used name' },
        { status: 422 }
      );
    }

    user.name = newName;

    await user.save();

    return NextResponse.json({
      message: 'Your name successfully changed',
      success: true,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}
