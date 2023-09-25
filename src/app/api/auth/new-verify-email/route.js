import { sendEmail } from '@/helpers/mailer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const reqBody = await req.json();
  const { clientEmail } = reqBody;
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email;

  if (clientEmail !== sessionEmail) {
    console.log('forbidden');
    return NextResponse.json({ error: 'Forbidden' });
  }

  try {
    const response = await sendEmail({
      email: sessionEmail,
      emailType: 'VERIFY',
      userId: session.user._id,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Could not send email please try again.',
      success: false,
    });
  }
}
