// app/desain/page.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface BaseProduct {
  id: string | number;
  category: string;
  imageUrl: string;
  createdAt?: string;
}

export default function DesainPage() {
  const [selectedCategory, setSelectedCategory] = useState('KANTOR');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [products, setProducts] = useState<BaseProduct[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isAdmin } = useAuth();

  // Generate static products
  const generateStaticProducts = (): BaseProduct[] => {
    let products: BaseProduct[] = [];
    let id = 1;

    // Rumah - dari 1 sampai 750
    for (let i = 1; i <= 750; i++) {
      products.push({
        id: `static-${id++}`,
        category: "Rumah",
        imageUrl: `/rumah/rumah (${i}).jpg`
      });
    }

    // Kantor - dari 1 sampai 300
    for (let i = 1; i <= 300; i++) {
      products.push({
        id: `static-${id++}`,
        category: "Kantor",
        imageUrl: `/kantor/kantor (${i}).jpg`
      });
    }

    // Usaha - dari 1 sampai 300
    for (let i = 1; i <= 300; i++) {
      products.push({
        id: `static-${id++}`,
        category: "Usaha",
        imageUrl: `/usaha/usaha (${i}).jpg`
      });
    }

    return products;
  };

  // Fetch and combine products
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) throw new Error('Failed to fetch images');
        const dbImages = await response.json();
        
        // Normalize database products
        const dbProducts: BaseProduct[] = dbImages.map((img: any) => ({
          id: img.id,
          category: img.category,
          imageUrl: img.url,
          createdAt: img.createdAt
        }));

        // Combine with static products
        const staticProducts = generateStaticProducts();
        setProducts([...dbProducts, ...staticProducts]);
      } catch (error) {
        console.error('Error fetching images:', error);
        // If DB fetch fails, at least show static products
        setProducts(generateStaticProducts());
      }
    };

    fetchImages();
  }, []);

  const filteredProducts = selectedCategory === 'ALL' 
    ? products 
    : products.filter(product => product.category.toUpperCase() === selectedCategory);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setUploadProgress(0);

      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', selectedCategory.toLowerCase());

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error'));
        });

        xhr.open('POST', '/api/images/upload');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
      });

      await uploadPromise;

      // Refresh products after upload
      const response = await fetch('/api/images');
      if (!response.ok) throw new Error('Failed to fetch updated images');
      const dbImages = await response.json();
      
      const dbProducts: BaseProduct[] = dbImages.map((img: any) => ({
        id: img.id,
        category: img.category,
        imageUrl: img.url,
        createdAt: img.createdAt
      }));
      
      const staticProducts = generateStaticProducts();
      setProducts([...dbProducts, ...staticProducts]);
      
      setUploadProgress(0);
      alert('Image uploaded successfully!');

    } catch (error) {
      console.error('Upload failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <section className="pt-32 pb-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-6 sm:space-x-12 overflow-x-auto pb-2">
            {['RUMAH', 'KANTOR', 'USAHA'].map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-base sm:text-lg font-medium pb-2 whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'text-gray-900 border-b-2 border-orange-400' 
                    : 'text-gray-500 hover:text-gray-900 transition-colors'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {/* Upload Button - For Admin */}
          {isAdmin && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-all h-40 sm:h-64 flex items-center justify-center"
            >
              <div className="text-center p-4 sm:p-6">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      Uploading... {uploadProgress}%
                    </span>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M24 12v12m0 0v12m0-12h12m-12 0H12"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-600">
                      Tambah Gambar
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                ref={fileInputRef}
              />
            </div>
          )}

          {/* All Products */}
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="relative bg-gray-100 rounded-lg overflow-hidden h-40 sm:h-64 cursor-pointer group"
              onClick={() => setSelectedImage(product.imageUrl)}
            >
              <Image
                src={product.imageUrl}
                alt={`Design ${product.category}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Modal/Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
              <button 
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                aria-label="Close preview"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="relative w-full h-[90vh]">
                <Image
                  src={selectedImage}
                  alt="Large preview"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}