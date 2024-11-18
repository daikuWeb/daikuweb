// app/api/auth/check/route.ts
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({
        isLoggedIn: false,
        user: null
      });
    }

    // Get user from database using token
    const user = await prisma.user.findFirst({
      where: {
        // Sesuaikan dengan struktur token Anda
        id: token // atau decode token jika menggunakan JWT
      }
    });

    return NextResponse.json({
      isLoggedIn: !!user,
      user: user ? {
        id: user.id,
        email: user.email,
        role: user.role
      } : null
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({
      isLoggedIn: false,
      user: null
    });
  }
}