import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Adopt from '@/models/adopt-model';
import User from '@/models/user-model';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function getAdopts(req, limit) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const { page = 1, filter } = req.query;
    const skip = (page - 1) * limit;
    let query = {};
    const totalAdopts = await Adopt.countDocuments(query);
    const userAdopts = await Adopt.countDocuments({ user });

    let totalPages = Math.ceil(totalAdopts / limit);
    const userPages = Math.ceil(userAdopts / limit);

    if (page < 1 || page > totalPages) {
      throw new Error('Page not found');
    }

    if (filter === 'my') {
      query = { user: user._id };
      totalPages = userPages;
    }

    const adopts = await Adopt.find(query)
      .populate({
        path: 'user',
        model: User,
        select: 'name image ',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return { adopts, totalPages };
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getAdoptById(id) {
  try {
    const question = await Adopt.findById(id).populate({
      path: 'user',
      model: User,
      select: 'name image',
    });

    return { question };
  } catch (error) {
    throw new Error(error.message);
  }
}
