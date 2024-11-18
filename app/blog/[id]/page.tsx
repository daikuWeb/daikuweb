// app/blog/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Blog {
  id: string;
  judul: string;
  keterangan: string;
  gambar: string;
  createdAt: string;
}

export default function BlogDetail() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
        } else {
          throw new Error('Blog tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Memuat...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Blog tidak ditemukan</div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{blog.judul}</h1>
      
      <time className="text-gray-500 block mb-8">
        {new Date(blog.createdAt).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </time>

      <div className="relative w-full aspect-[16/9] mb-8">
        <Image
          src={blog.gambar}
          alt={blog.judul}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      <div className="prose max-w-none">
        {blog.keterangan.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 break-words whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}