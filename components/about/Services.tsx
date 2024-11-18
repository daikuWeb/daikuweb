import Image from 'next/image';
import Link from 'next/link';

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">
            Tentang Kami
          </h1>
          <p className="text-lg text-gray-600">
            Mengenal lebih dekat tim profesional di balik setiap proyek interior impian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Image Section - Only visible on mobile */}
          <div className="block lg:hidden w-full mb-8">
            <div className="relative h-[300px] rounded-2xl overflow-hidden bg-white shadow-xl">
              {/* Grid Container */}
              <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2">
                {/* Three equal-sized images */}
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/service/image1.png"
                    alt="Service Image 1"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/service/image2.png"
                    alt="Service Image 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/service/image3.png"
                    alt="Service Image 3"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Desktop Image Container - Only visible on desktop */}
          <div className="hidden lg:block order-1 lg:order-none">
            <div className="relative h-[600px] rounded-2xl overflow-hidden bg-white shadow-xl">
              {/* Grid Container */}
              <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2">
                {/* Three equal-sized images */}
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/service/image1.png"
                    alt="Service Image 1"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/service/image2.png"
                    alt="Service Image 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/service/image3.png"
                    alt="Service Image 3"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Services Container */}
          <div className="space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Solusi Terpadu Untuk Ruang Impian Anda
              </h2>
              <p className="text-gray-600">
                Kami hadir dengan tim profesional yang berpengalaman untuk mewujudkan ruangan impian Anda melalui tiga layanan utama kami.
              </p>
            </div>

            {/* Services Cards */}
            <div className="grid gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              href="/aboutus" 
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Selengkapnya Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services data
const services = [
  {
    title: 'Studio Arsitek',
    description: 'Tim arsitek profesional kami siap membantu Anda dalam perencanaan dan desain yang matang, mulai dari konsep hingga detail pelaksanaan.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Workshop',
    description: 'Dilengkapi dengan workshop sendiri untuk menghasilkan furniture custom berkualitas tinggi sesuai dengan desain dan kebutuhan spesifik Anda.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: 'Renovasi',
    description: 'Layanan renovasi profesional dengan pengerjaan cepat dan rapi, didukung oleh tim terpercaya yang berpengalaman dalam berbagai proyek.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  }
];

export default Services;