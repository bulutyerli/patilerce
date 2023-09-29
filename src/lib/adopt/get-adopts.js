import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Adopt from '@/models/adopt-model';
import User from '@/models/user-model';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db-config';

connectDB();

export const dynamic = 'force-dynamic';

export async function getAdopts(req, limit, petType) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const { page = 1, filter, breed } = req.query;
    const skip = (page - 1) * limit;
    let query = { petType: petType, isApproved: true };
    const totalAdopts = await Adopt.countDocuments(query);
    const userAdopts = await Adopt.countDocuments({ user, petType });
    const userFavs = await Adopt.countDocuments({ favoritedBy: user?._id });
    const pendingAdopts = await Adopt.countDocuments({
      user,
      isApproved: false,
    });
    let totalPages = Math.ceil(totalAdopts / limit);
    const userPages = Math.ceil(userAdopts / limit);
    const favPages = Math.ceil(userFavs / limit);
    const pendingPages = Math.ceil(pendingAdopts / limit);

    if (page < 1 || page > totalPages) {
      throw new Error('Page not found');
    }

    if (filter === 'my') {
      query = {
        $and: [{ petType: petType }, { user: user?._id }, { isApproved: true }],
      };
      totalPages = userPages;
    }

    if (filter === 'fav') {
      query = {
        $and: [{ petType: petType }, { favoritedBy: user?._id }],
      };
      totalPages = favPages;
    }

    if (filter === 'pending') {
      query = {
        petType: petType,
        user: user?._id,
        isApproved: false,
      };
      totalPages = pendingPages;
    }

    if (breed) {
      const getBreedName = breed
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '); // reformat searchParams to database breed values

      query = {
        $and: [
          { petType: petType },
          { isApproved: true },
          { breed: getBreedName },
        ],
      };
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
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function getAdoptById(id) {
  try {
    const adopt = await Adopt.findById(id).populate({
      path: 'user',
      model: User,
      select: 'name image createdAt',
    });

    return adopt;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getBreedCounts(petType) {
  try {
    const breedCounts = await Adopt.aggregate([
      {
        $match: {
          petType: petType, // Filter by petType (e.g., 'Cat' or 'Dog')
          isApproved: true,
        },
      },
      {
        $group: {
          _id: '$breed', // Group by breed name
          count: { $sum: 1 }, // Count the number of listings for each breed
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return breedCounts;
  } catch (error) {
    console.error('Error fetching breed counts:', error);
    return [];
  }
}

export async function getAllUserAdopts(req, limit) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { page = 1, filter } = req.query;
  const skip = (page - 1) * limit;
  let query = { user: user?._id, isApproved: true };
  const userAdopts = await Adopt.countDocuments({ user });
  const totalPages = Math.ceil(userAdopts / limit);

  if (filter === 'pending') {
    query = {
      user: user?._id,
      isApproved: false,
    };
  }
  try {
    const adopts = await Adopt.find(query)
      .populate({
        path: 'user',
        model: User,
        select: 'name image ',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(10));
    return { adopts, totalPages };
  } catch (error) {
    console.log(error);
  }
}
