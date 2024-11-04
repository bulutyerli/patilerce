import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import Adopt from '@/models/adopt-model';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

connectDB();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.isAdmin;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' });
    }

    const adopts = await Adopt.find({ isApproved: false }).populate({
      path: 'user',
      model: User,
      select: 'name email _id',
    });
    return NextResponse.json({ adopts, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}

export async function PUT(req) {
  try {
    const reqBody = await req.json();
    const { adoptId, action } = reqBody;

    const adopt = await Adopt.findById(adoptId);

    if (!adopt) {
      return NextResponse.json({
        error: 'Could not get the adopt listing',
        success: false,
      });
    }

    if (action === 'approve') {
      adopt.isApproved = true;
      await adopt.save();
      return NextResponse.json({ success: true });
    }
    if (action === 'reject') {
      await Adopt.deleteOne({ _id: adoptId });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
