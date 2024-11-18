// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function verifyAdmin(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      console.log('Token tidak ditemukan');
      return false;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    console.log('User role:', user?.role);
    return user?.role === 'ADMIN';
  } catch (error) {
    console.error('Verifikasi admin error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verifikasi admin
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Anda tidak memiliki akses admin' },
        { status: 401 }
      );
    }

    // Ambil data form
    const formData = await request.formData();
    const judul = formData.get('title') as string;
    const keterangan = formData.get('content') as string;
    const gambar = formData.get('coverImage') as File;

    // Validasi input
    if (!judul) {
      return NextResponse.json({ error: 'Judul tidak boleh kosong' }, { status: 400 });
    }
    if (!keterangan) {
      return NextResponse.json({ error: 'Konten tidak boleh kosong' }, { status: 400 });
    }
    if (!gambar) {
      return NextResponse.json({ error: 'Gambar harus diupload' }, { status: 400 });
    }

    // Buat direktori upload jika belum ada
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'blog');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate nama file unik
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = gambar.name.substring(gambar.name.lastIndexOf('.'));
    const filename = `blog-${uniqueSuffix}${extension}`;
    
    // Simpan gambar
    const bytes = await gambar.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imagePath = join(uploadDir, filename);
    await writeFile(imagePath, buffer);
    const imageUrl = `/uploads/blog/${filename}`;

    // Buat blog post
    const blog = await prisma.blog.create({
      data: {
        judul,
        keterangan,
        gambar: imageUrl,
      }
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error lengkap:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Gagal membuat blog post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc'  // Urutkan dari yang terbaru
      }
    });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error mengambil blog:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data blog' },
      { status: 500 }
    );
  }
}