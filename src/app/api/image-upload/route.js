import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ID,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

async function uploadImageToS3(file, fileName) {
  const resizedImageBuffer = await sharp(file)
    .resize(750, 550) // Specify your desired width or height for resizing
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: resizedImageBuffer,
    ContentType: 'image/jpeg', // Change the content type accordingly
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const files = formData.getAll('file');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'At least one file is required.' },
        { status: 400 }
      );
    }

    if (files.length > 4) {
      return NextResponse.json(
        {
          error: 'You can upload 4 files at most',
        },
        { status: 400 }
      );
    }

    const imageLinks = [];

    for (const file of files) {
      const mimeType = file.type;

      if (!mimeType.startsWith('image/')) {
        return NextResponse.json(
          {
            error: 'Only image files are allowed',
          },
          {
            status: 400,
          }
        );
      }

      const fileExtension = mimeType.split('/')[1];

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadImageToS3(
        buffer,
        Date.now() + uuid() + '.' + fileExtension
      );

      const baseURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      imageLinks.push(baseURL);
    }

    return NextResponse.json({ success: true, imageLinks });
  } catch (error) {
    console.error('Error uploading image:', error);
    NextResponse.json({ message: 'Error uploading image' });
  }
}
