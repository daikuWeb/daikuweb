import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../../data/blogPosts';

export function Hero() {
  const handleGetStarted = () => {
    window.open('https://wa.me/+628117597766', '_blank');
  };

  const latestBlogPosts = blogPosts.slice(0, 3);

  return (
    <section className="pt-16 min-h-[800px] w-full relative overflow-hidden">
      <div className="absolute top-20 left-8 text-sm text-gray-600">
        #1 Design Interior & Exterior Pekanbaru
      </div>
      
      <div className="max-w-[1920px] h-full mx-auto px-4 sm:px-8 py-12">
        {/* Mobile Images */}
        <div className="lg:hidden w-full relative h-[400px] mb-8">
          {/* Single Mobile Image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[400px] rounded-3xl overflow-hidden border-4 border-white">
            <Image
              src="/hero/1.jpg"
              alt="Interior Design"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Mini Blog Posts Section - Mobile Only */}
        <div className="block lg:hidden space-y-2 w-[250px] mb-8 ml-4">
          {latestBlogPosts.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-center space-x-3 p-1.5 hover:bg-gray-50 rounded-lg transition-colors group bg-white/80 backdrop-blur-sm"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0 max-w-[180px]">
                <h3 className="font-medium text-sm text-gray-900 group-hover:text-gray-600 transition-colors truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('id-ID', { 
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-5 lg:mt-32">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight max-w-xl">
              PROFESSIONAL INTERIOR DESIGN & BUILDING SOLUTION
            </h1>
            
            <p className="text-gray-600 text-base max-w-lg">
              Daiku Interior hadir sebagai solusi lengkap untuk kebutuhan interior dan furniture Anda. Melayani Residential - Office - Commercial dengan design profesional.
            </p>

            <div>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full transition-colors flex items-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Konsultasi Sekarang
              </button>
            </div>
          </div>

          {/* Right Column - Desktop Images (hidden on mobile) */}
          <div className="hidden lg:block relative w-full h-[600px] -ml-32">
            {/* Gambar Utama (Gambar 1) */}
            <div className="absolute -top-8 left-0 w-[400px] h-[600px] rounded-3xl overflow-hidden border-4 border-white">
              <Image
                src="/hero/1.jpg"
                alt="Interior Design"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Gambar Overlay (Gambar 2) */}
            <div className="absolute top-16 right-0 w-[400px] h-[200px] rounded-2xl overflow-hidden border-4 border-white">
              <Image
                src="/hero/2.jpg"
                alt="Scandinavian Design"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mini Blog Posts Section - Desktop Only */}
        <div className="hidden lg:block lg:absolute lg:bottom-32 lg:right-32 lg:w-[250px] space-y-2">
          {latestBlogPosts.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex items-center space-x-3 p-1.5 hover:bg-gray-50 rounded-lg transition-colors group bg-white/80 backdrop-blur-sm"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0 max-w-[180px]">
                <h3 className="font-medium text-sm text-gray-900 group-hover:text-gray-600 transition-colors truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('id-ID', { 
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <svg 
                className="w-4 h-4 text-gray-400 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}