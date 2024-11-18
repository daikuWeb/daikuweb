// app/api/blog/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: context.params.id
      }
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail blog' },
      { status: 500 }
    );
  }
}