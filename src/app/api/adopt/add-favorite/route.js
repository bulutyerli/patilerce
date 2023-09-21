import connectDB from '@/app/config/db-config';
import Adopt from '@/models/adopt-model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

connectDB();

export async function PUT(req) {
  const reqBody = await req.json();
  const { adoptId } = reqBody;
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;

  if (!userId) {
    return NextResponse.json({ error: 'forbidden' });
  }

  try {
    // Check if the user is already in favoritedBy array
    const adopt = await Adopt.findOne({ _id: adoptId, favoritedBy: userId });

    if (adopt) {
      // If user is already favorited, remove
      await Adopt.findByIdAndUpdate(
        adoptId,
        { $pull: { favoritedBy: userId } },
        { new: true }
      );
      return NextResponse.json({
        success: true,
        message: 'Removed from favorites',
      });
    } else {
      // If user is not favorited, add them
      const favAdopt = await Adopt.findByIdAndUpdate(
        adoptId,
        { $addToSet: { favoritedBy: userId } },
        { new: true }
      );

      if (!favAdopt) {
        return NextResponse.json({ error: 'Listing not found' });
      }
      return NextResponse.json({
        success: true,
        message: 'Added to favorites',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}

export async function GET(req) {
  const reqBody = await req.json();
  const { adoptId } = reqBody;
  const session = await getServerSession(authOptions);
  const userId = session.user._id;

  if (!userId) {
    return NextResponse.json({ error: 'user not found' });
  }

  try {
    const isFav = await Adopt.findOne({ _id: adoptId, favoritedBy: userId });

    if (isFav) {
      return NextResponse.json({ success: true });
    } else return null;
  } catch (error) {
    console.error(error);
  }
}
