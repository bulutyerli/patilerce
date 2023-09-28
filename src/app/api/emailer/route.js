import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const reqBody = await req.json();
  const { name, title, email, subject } = reqBody;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tailwishinfo@gmail.com',
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: `Contact Form: ${title}`,
      text: `Name: ${name}\n\nFrom: ${email}\n\n Subject: ${subject}`,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log(response);

    if (response.accepted.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
