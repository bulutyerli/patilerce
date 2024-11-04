import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

connectDB();

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    const isAdmin = session?.user?.isAdmin;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' });
    }

    const users = await User.find();

    return NextResponse.json({ users, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  try {
    const isAdmin = session?.user?.isAdmin;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' });
    }

    const reqBody = await req.json();
    const { id, action } = reqBody;

    const user = await User.findById(id);

    if (!user) {
      console.log('user not found');
      return NextResponse.json({
        error: 'Could not get the user',
        success: false,
      });
    }

    if (action === 'ban') {
      user.isBanned = true;
      await user.save();
      return NextResponse.json({ success: true });
    }
    if (action === 'unban') {
      user.isBanned = false;
      await user.save();
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}
