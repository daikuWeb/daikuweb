// app/api/images/upload/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const path = join(process.cwd(), 'public', category, filename);
    await writeFile(path, buffer);

    const url = `/${category}/${filename}`;
    const image = await prisma.image.create({
      data: {
        category,
        url,
      },
    });

    return NextResponse.json({ 
      success: true,
      image 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}