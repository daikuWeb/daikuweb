// app/api/auth/check/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
  try {
    // Get the token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          isLoggedIn: false,
          user: null 
        },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = verify(token, JWT_SECRET) as { userId: string };

    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { 
          isLoggedIn: false,
          user: null 
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      isLoggedIn: true,
      user
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { 
        isLoggedIn: false,
        user: null 
      },
      { status: 401 }
    );
  }
}