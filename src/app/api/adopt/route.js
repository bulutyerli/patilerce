import connectDB from '@/app/config/db-config';
import User from '@/models/user-model';
import Adopt from '@/models/adopt-model';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { title, details, petType, breed, age, gender, images } =
      reqBody.formData;

    console.log(reqBody);

    const session = await getServerSession(authOptions);
    const id = session.user._id;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const values = Object.values(reqBody.formData);
    const isFormValid = values.every((value) => value.length > 0);

    if (!isFormValid) {
      return NextResponse.json(
        { error: 'Form is not valid' },
        {
          status: 400,
        }
      );
    }

    const newAdopt = new Adopt({
      title: title,
      details: details,
      petType: petType,
      breed: breed,
      age: age,
      gender: gender,
      images: images,
      user: user._id,
    });

    await newAdopt.save();

    return NextResponse.json({
      message: 'New adoption listing successfully created',
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
}
