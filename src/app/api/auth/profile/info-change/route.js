import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../[...nextauth]/route';

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, newName, profileImage } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    if (newName) {
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
    }

    if (profileImage) {
      user.image = profileImage[0];

      await user.save();

      return NextResponse.json({
        message: 'Your profile image successfully changed',
        success: true,
      });
    }
  } catch (error) {
    const statusCode = error.status || 500;
    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'No User Found' });
    }
    const image = user.image;
    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}
