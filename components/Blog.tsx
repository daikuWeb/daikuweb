"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Icons Components
const PlusIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    className="w-12 h-12 text-gray-400"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 5v14m-7-7h14"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ImageIcon = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

interface Blog {
  id: string;
  judul: string;
  keterangan: string;
  gambar: string;
  createdAt: string;
}

export function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { isAdmin } = useAuth();
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error('Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const getPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return blogs
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat blog post');
      }

      setShowAddForm(false);
      setFormData({
        title: '',
        content: '',
        coverImage: null
      });
      setImagePreview(null);
      fetchBlogs();

    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Gagal membuat blog post. Silakan coba lagi.' + 
        (error instanceof Error ? `\nDetail: ${error.message}` : ''));
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Daiku Design</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Temukan inspirasi dan tips desain interior untuk hunian impian Anda.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isAdmin && (
            <div 
              onClick={() => setShowAddForm(true)}
              className="block transform transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative bg-white rounded-3xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors h-full min-h-[480px] flex flex-col items-center justify-center">
                <PlusIcon />
                <span className="mt-4 text-gray-600 font-medium">Tambah Blog</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500"></div>
              </div>
            </div>
          )}
          
          {getPageItems().map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="block transform transition-all duration-300 hover:-translate-y-1">
              <article className="relative bg-white rounded-3xl overflow-hidden shadow-lg h-full flex flex-col">
                <div className="relative h-[240px] w-full flex-shrink-0">
                  <Image
                    src={post.gambar}
                    alt={post.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <time className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/\//g, '.')}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-yellow-500 transition-colors">
                    {post.judul}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 flex-grow">
                    {post.keterangan}
                  </p>
                </div>
                {/* Garis kuning di bawah card */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500"></div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-yellow-500'}`}
            >
              <svg
                className="w-6 h-6 transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="text-gray-600">
              {currentPage}/{totalPages}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-yellow-500'}`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Add Blog Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Tambah Blog Baru</h2>
                  <button 
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({
                        title: '',
                        content: '',
                        coverImage: null
                      });
                      setImagePreview(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <CloseIcon />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gambar Cover
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              fill
                              className="object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData(prev => ({ ...prev, coverImage: null }));
                              }}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                            >
                              <CloseIcon />
                            </button>
                          </div>
                        ) : (
                          <>
                            <ImageIcon />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="cover-image"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-500 hover:text-yellow-600"
                              >
                                <span>Upload gambar</span>
                                <input
                                  id="cover-image"
                                  name="cover-image"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={handleImageChange}
                                  required
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Judul Blog */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Blog
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Masukkan judul blog..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>

                  {/* Konten */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konten Blog
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={8}
                      placeholder="Tulis konten blog Anda di sini..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setFormData({
                          title: '',
                          content: '',
                          coverImage: null
                        });
                        setImagePreview(null);
                      }}
                      className="px-6 py-2 text-gray-600 hover:text-gray-800 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
                    >
                      Simpan Blog
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;