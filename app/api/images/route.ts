// app/api/images/route.ts
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to verify admin
async function verifyAdmin(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) return false;

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    return user?.role === 'ADMIN';
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;
    const category = formData.get('category') as string;

    if (!file || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Implement your file upload logic here
    // This is just a placeholder - you'll need to implement actual file upload
    const imageUrl = `/uploads/${file.name}`;

    const savedImage = await prisma.image.create({
      data: {
        category: category.toLowerCase(),
        url: imageUrl,
      }
    });

    return NextResponse.json(savedImage);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}