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
    const {
      title,
      details,
      petType,
      breed,
      age,
      gender,
      images,
      email: formEmail,
      phoneNumber: formPhone,
    } = reqBody.formData;

    const session = await getServerSession(authOptions);
    const id = session.user._id;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const { email, phoneNumber, ...rest } = reqBody.formData;
    const values = Object.values(rest);
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
      email: formEmail,
      phoneNumber: formPhone,
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

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { dataId } = reqBody;

    const user = await User.findById(userId);
    const adopt = await Adopt.findById(dataId);

    if (!user) {
      console.log('no user');
      throw new Error('There is no user');
    }

    if (!adopt) {
      console.log('no adopt listing');

      throw new Error('Adopt listing not found');
    }

    if (user.id.toString() !== adopt.user._id.toString()) {
      throw new Error('Forbidden');
    }

    await Adopt.deleteOne({ _id: dataId });

    return NextResponse.json({
      message: 'Adopt listing successfully deleted',
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user._id;
    const reqBody = await req.json();
    const { adoptId, formData } = reqBody;
    console.log('this is formdata:', formData);

    if (!userId) {
      console.log('no user');
      throw new Error('There is no user');
    }

    const adopt = await Adopt.findByIdAndUpdate(adoptId, formData, {
      new: true,
    });
    if (!adopt) {
      return NextResponse.json({ error: 'No listing found' });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}
