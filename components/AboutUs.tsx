// components/AboutUs.tsx
import Image from 'next/image';

export function AboutUs() {
  return (
    <section className="bg-white">
      {/* Bagian 1: Hero Image - Dimodifikasi untuk mobile */}
      <div className="relative min-h-screen w-full flex flex-col md:flex-row items-center">
        {/* Text section - akan muncul di atas pada mobile */}
        <div className="w-full md:w-1/2 px-6 py-8 order-1 md:order-2">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Desain dan Pembangunan<br />
            <span className="text-orange-400">Interior & Eksterior</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-600">
            CV. INDOCRAF ASIA
          </p>
        </div>
        {/* Image section - akan muncul di bawah pada mobile */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="relative h-[50vh] md:h-screen w-full">
            <Image
              src="/about/1.png"
              alt="Daiku Design Project"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bagian 2: About Us Section */}
      <div className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white">TENTANG KAMI</h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-6">
                Kami mengkhususkan diri dalam desain interior layanan penuh, portofolio proyek kami mencakup konstruksi rumah baru dan renovasi interior residensial dari semua ukuran, kecil hingga besar.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-300">
                Responsif terhadap visi klien kami, kami berkomitmen untuk mendesain yang mengekspresikan keterkaitan antara arsitektur dan tempat, ruang dan bentuk, warna dan material, ekonomi dan integritas.
              </p>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/about/2.png"
                alt="About Us Image"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 3: Client Section - Dimodifikasi untuk mobile */}
      <div className="relative py-16 md:py-24 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">KLIEN KAMI</h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-3xl mx-auto">
              DAIKU ADALAH AHLI INTERIOR TERKEMUKA DAN PROMOTOR DI PROVINSI RIAU, SEJAK 2017, INDONESIA. BERSAMA DENGAN TIM, KAMI BEKERJA SANGAT TELITI DALAM MENANGANI SETIAP ASPEK INTERIOR DAN EKSTERIOR.
            </p>
          </div>
          <div className="relative w-full h-screen">
            <Image
              src="/about/3.png"
              alt="Our Clients"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bagian 4: Vision Mission */}
      <div className="relative py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">VISI DAN MISI KAMI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <div className="text-orange-500 mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Keterlibatan personal kami akan menyeluruh, memberikan Anda pemahaman mendalam tentang proses dan hasil desain kami.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <div className="text-orange-500 mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Kami percaya bahwa perhatian konstan terhadap detail dari konsep awal hingga pemasangan akhir furnitur sangat penting untuk memastikan kepuasan Anda.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <div className="text-orange-500 mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Kami menghargai anggaran Anda dan menyesuaikan solusi yang sesuai dengannya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 5: Services Section */}
      <div className="relative py-16 md:py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Desain & Perencanaan */}
            <div className="p-6 md:p-8 bg-white/5 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-normal text-white mb-4">Desain & Perencanaan</h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Sebagai spesialis desain interior, kami menawarkan solusi terbaik untuk menciptakan ruang kerja yang nyaman dan efisien, memungkinkan staf meningkatkan produktivitas mereka.
              </p>
            </div>

            {/* Teknik Sipil */}
            <div className="p-6 md:p-8 bg-white/5 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-normal text-white mb-4">Teknik Sipil</h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Untuk membagi ruang kerja tanpa mengorbankan desain atau kualitas. Memberikan tampilan segar, bersih, modern untuk ruang kerja Anda, dari lantai hingga plafon.
              </p>
            </div>

            {/* Furnitur Kustom */}
            <div className="p-6 md:p-8 bg-white/5 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-normal text-white mb-4">Furnitur Kustom</h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Kami mendesain dan menciptakan solusi furnitur sesuai spesifikasi Anda, memastikan lingkungan kerja yang nyaman dan efektif bagi seluruh staf.
              </p>
            </div>

            {/* Mekanikal & Elektrikal */}
            <div className="p-6 md:p-8 bg-white/5 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-normal text-white mb-4">Mekanikal & Elektrikal</h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Menyediakan layanan elektrikal dan mekanikal lengkap, dari desain hingga instalasi. Tim multidisiplin kami menyelesaikan proyek tepat waktu dengan dukungan purna jual penuh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 6: Gallery Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(18)].map((_, index) => (
          <div key={index + 6} className="relative w-full aspect-video">
            <Image
              src={`/about/${index + 6}.png`}
              alt={`Gallery Image ${index + 6}`}
              fill
              className="object-cover"
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutUs;